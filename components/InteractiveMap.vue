<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import type { Stop } from "~/types";

const props = defineProps<{
  stops: Stop[];
}>();

const mapContainer = ref<HTMLElement | null>(null);
const map = ref<google.maps.Map | null>(null);
const directionsService = ref<google.maps.DirectionsService | null>(null);
const directionsRenderer = ref<google.maps.DirectionsRenderer | null>(null);
const isCalculating = ref(false);
const error = ref<string | null>(null);

function initMap(): void {
  if (!mapContainer.value) {
    console.error("Map container not found");
    return;
  }

  try {
    // Initialize map
    map.value = new google.maps.Map(mapContainer.value, {
      center: { lat: 41.85, lng: -87.65 },
      zoom: 7,
      styles: [
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#e9e9e9" }, { lightness: 17 }],
        },
        {
          featureType: "landscape",
          elementType: "geometry",
          stylers: [{ color: "#f5f5f5" }, { lightness: 20 }],
        },
      ],
    });

    // Initialize directions services
    directionsService.value = new google.maps.DirectionsService();
    directionsRenderer.value = new google.maps.DirectionsRenderer({
      map: map.value,
      suppressMarkers: false,
      preserveViewport: false,
    });

    console.log("Map initialized successfully");

    // If we already have stops, calculate the route
    if (props.stops.length >= 2) {
      calculateAndDisplayRoute();
    }
  } catch (e) {
    console.error("Error initializing map:", e);
    error.value = "Failed to initialize map";
  }
}

function validateLocation(stop: Stop): boolean {
  return (
    typeof stop.address === "string" ||
    (typeof stop.address === "object" &&
      "lat" in stop.address &&
      "lng" in stop.address)
  );
}

async function calculateAndDisplayRoute(): Promise<void> {
  if (!directionsService.value || !directionsRenderer.value) {
    console.error("Directions service not initialized");
    return;
  }

  if (props.stops.length < 2) {
    console.error("Need at least 2 stops");
    return;
  }

  // Validate locations
  if (!props.stops.every(validateLocation)) {
    console.error("Invalid location format in stops");
    return;
  }

  isCalculating.value = true;
  error.value = null;

  try {
    const origin = props.stops[0].address;
    const destination = props.stops[props.stops.length - 1].address;
    const waypoints = props.stops.slice(1, -1).map((stop) => ({
      location: stop.address,
      stopover: true,
    }));

    console.log("Calculating route with:", {
      origin,
      destination,
      waypointsCount: waypoints.length,
    });

    const response = await directionsService.value.route({
      origin,
      destination,
      waypoints,
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.DRIVING,
    });

    directionsRenderer.value.setDirections(response);
    console.log("Route calculated successfully");
  } catch (e) {
    console.error("Direction service error:", e);
    error.value = "Failed to calculate route";
  } finally {
    isCalculating.value = false;
  }
}

// Initialize map when component mounts
onMounted(() => {
  console.log("Component mounted");
  initMap();
});

// Watch for changes in stops
watch(
  () => props.stops,
  (newStops) => {
    console.log("Stops changed:", newStops.length);
    if (newStops.length >= 2) {
      calculateAndDisplayRoute();
    } else if (directionsRenderer.value) {
      directionsRenderer.value.setDirections(null);
    }
  },
  { deep: true }
);
</script>

<template>
  <div class="map-container">
    <div id="floating-panel" class="mb-4">
      <div v-if="error" class="text-red-600">{{ error }}</div>
      <div v-else-if="isCalculating" class="text-gray-600">
        Calculating route...
      </div>
      <div v-else class="text-gray-600">
        Route displayed for {{ stops.length }} stops
      </div>
    </div>
    <div ref="mapContainer" class="w-full h-[500px]"></div>
    <div id="sidebar" class="mt-4"></div>
  </div>
</template>

<style scoped>
.map-container {
  padding: 1rem;
}

#floating-panel {
  position: relative;
  z-index: 5;
  background-color: white;
  padding: 1rem;
  border-radius: 0.5rem;
}
</style>
