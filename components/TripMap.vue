<template>
  <div class="map-container">
    <div
      v-if="isCalculating"
      class="w-full h-[500px] rounded-lg shadow-md bg-gray-100 flex items-center justify-center"
    >
      <div class="text-center">
        <div
          class="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent mx-auto mb-4"
        ></div>
        <p class="text-gray-600">Preparing your route...</p>
      </div>
    </div>

    <div
      ref="mapContainer"
      id="map"
      class="w-full h-[500px] rounded-lg shadow-md"
      role="region"
      aria-label="Interactive Map"
    ></div>
  </div>
</template>

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
const markers = ref<google.maps.Marker[]>([]);

function clearMarkers() {
  markers.value.forEach((marker) => marker.setMap(null));
  markers.value = [];
}

function createMarkerLabel(index: number): google.maps.MarkerLabel {
  return {
    text: String(index + 1),
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: "14px",
  };
}

function isValidCoordinate(num: any): boolean {
  return typeof num === "number" && !isNaN(num) && isFinite(num);
}

function initMap(): void {
  if (!mapContainer.value) {
    error.value = "Required DOM elements not found";
    return;
  }

  try {
    map.value = new google.maps.Map(mapContainer.value, {
      zoom: 7,
      center: { lat: 41.85, lng: -87.65 },
      disableDefaultUI: false,
      mapTypeControl: true,
      streetViewControl: true,
      fullscreenControl: true,
      zoomControl: true,
      gestureHandling: "greedy", // Enables one-finger zoom on mobile
      scrollwheel: true, // Enables mouse wheel zoom
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_CENTER,
      },
    });

    // Add smooth zoom behavior
    map.value.addListener('wheel', (event: WheelEvent) => {
      const delta = event.deltaY;
      const currentZoom = map.value!.getZoom() || 7;
      
      // Smooth zoom calculation
      const zoomDelta = -delta / 200; // Adjust divisor for zoom sensitivity
      const newZoom = Math.min(Math.max(currentZoom + zoomDelta, 1), 20);
      
      if (newZoom !== currentZoom) {
        map.value!.setZoom(newZoom);
      }
    });

    directionsRenderer.value = new google.maps.DirectionsRenderer({
      suppressMarkers: true, // Suppress default markers
      map: map.value,
    });
    directionsService.value = new google.maps.DirectionsService();

    if (props.stops.length >= 2) {
      calculateAndDisplayRoute();
    }
  } catch (e) {
    console.error("Error initializing map:", e);
    error.value = "Failed to initialize map";
  }
}

async function calculateAndDisplayRoute(): Promise<void> {
  if (
    !directionsService.value ||
    !directionsRenderer.value ||
    props.stops.length < 2
  ) {
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

    const response = await directionsService.value.route({
      origin,
      destination,
      waypoints,
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.DRIVING,
    });

    directionsRenderer.value.setDirections(response);

    // Clear existing markers
    clearMarkers();

    // Add custom markers for each stop with validation
    props.stops.forEach((stop, index) => {
      if (!isValidCoordinate(stop.lat) || !isValidCoordinate(stop.lng)) {
        console.warn(`Invalid coordinates for stop ${index}:`, stop);
        return;
      }

      const marker = new google.maps.Marker({
        position: {
          lat: Number(stop.lat),
          lng: Number(stop.lng),
        },
        map: map.value,
        title: createMarkerLabel(index).text,
        label: createMarkerLabel(index),
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 12,
          fillColor: "#FF5A5F",
          fillOpacity: 1,
          strokeColor: "#FFFFFF",
          strokeWeight: 2,
        },
      });
      markers.value.push(marker);
    });

    await new Promise((resolve) => setTimeout(resolve, 500)); // Add slight delay for smoother transition
  } catch (e) {
    console.error("Direction service error:", e);
    error.value = "Failed to calculate route";
  } finally {
    isCalculating.value = false;
  }
}

onMounted(() => {
  console.log("Component mounted");
  initMap();
});

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

<style scoped>
.map-container {
  position: relative;
  width: 100%;
}
</style>
