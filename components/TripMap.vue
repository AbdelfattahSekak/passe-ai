<template>
  <div class="map-container">
    <div
      v-if="isCalculating"
      class="w-full h-full rounded-lg shadow-md bg-gray-100 flex items-center justify-center absolute z-10"
    >
      <div class="text-center">
        <div class="dots-loader mb-4">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>
      </div>
    </div>

    <div
      ref="mapContainer"
      id="map"
      class="w-full h-full min-h-[700px] shadow-md"
      role="region"
      aria-label="Interactive Map"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import type { Activity, Stop } from "~/types";

const props = defineProps<{
  stops: Stop[];
}>();

const mapContainer = ref<HTMLElement | null>(null);
const map = ref<google.maps.Map | null>(null);
const directionsService = ref<google.maps.DirectionsService | null>(null);
const directionsRenderer = ref<google.maps.DirectionsRenderer | null>(null);
const isCalculating = ref(false);
const error = ref<string | null>(null);
const markers = ref<google.maps.marker.AdvancedMarkerElement[]>([]);
const activityMarkers = ref<google.maps.marker.AdvancedMarkerElement[]>([]);
const infoWindows = ref<google.maps.InfoWindow[]>([]);

function clearMarkers() {
  markers.value.forEach((marker) => marker.remove());
  markers.value = [];
}

function clearAllMarkers() {
  clearMarkers();
  activityMarkers.value.forEach((marker) => marker.remove());
  activityMarkers.value = [];
  infoWindows.value.forEach((window) => window.close());
  infoWindows.value = [];
}

function isValidCoordinate(num: any): boolean {
  return typeof num === "number" && !isNaN(num) && isFinite(num);
}

async function createActivityMarker(activity: Activity, stopIndex: number) {
  const { AdvancedMarkerElement, PinElement } =
    (await google.maps.importLibrary("marker")) as google.maps.MarkerLibrary;
  const { InfoWindow } = (await google.maps.importLibrary(
    "maps"
  )) as google.maps.MapsLibrary;
  if (!isValidCoordinate(activity.lat) || !isValidCoordinate(activity.lng)) {
    console.warn("Invalid coordinates for activity:", activity);
    return;
  }

  const icon = document.createElement("div");
  icon.innerHTML = '<i class="pi pi-map-marker"></i>';
  const faPin = new PinElement({
    glyph: icon,
    glyphColor: "#FFFFFF",
    background: "#4CAF50",
    borderColor: "#388E3C",
    scale: 1.2,
  });

  const marker = new AdvancedMarkerElement({
    position: {
      lat: Number(activity.lat),
      lng: Number(activity.lng),
    },
    map: map.value,
    content: faPin.element,
    title: activity.title,
  });

  const infoWindow = new InfoWindow({
    ariaLabel: activity.title,
    headerContent: activity.title,
    content: `
      <div>
        <p class="text-sm">${activity.details}</p>
      </div>
    `,
  });

  marker.addListener("click", () => {
    infoWindows.value.forEach((window) => window.close());
    infoWindow.open(map.value, marker);
  });

  activityMarkers.value.push(marker);
  infoWindows.value.push(infoWindow);
}

async function initMap() {
  const { Map } = (await google.maps.importLibrary(
    "maps"
  )) as google.maps.MapsLibrary;
  const { DirectionsRenderer } = (await google.maps.importLibrary(
    "routes"
  )) as google.maps.RoutesLibrary;
  const { DirectionsService } = (await google.maps.importLibrary(
    "routes"
  )) as google.maps.RoutesLibrary;
  if (!mapContainer.value) {
    error.value = "Required DOM elements not found";
    return;
  }

  try {
    map.value = new Map(mapContainer.value, {
      mapId: "main-map",
      zoom: 7,
      center: { lat: 41.85, lng: -87.65 },
      disableDefaultUI: false,
      mapTypeControl: false, // Hide map type control for cleaner look
      streetViewControl: false, // Hide street view for cleaner look
      fullscreenControl: false, // Hide fullscreen control for cleaner look
      zoomControl: true,
      gestureHandling: "greedy", // Enables one-finger zoom on mobile
      scrollwheel: true, // Enables mouse wheel zoom
    });

    // Add smooth zoom behavior
    map.value.addListener("wheel", (event: WheelEvent) => {
      const delta = event.deltaY;
      const currentZoom = map.value!.getZoom() || 7;

      // Smooth zoom calculation
      const zoomDelta = -delta / 200; // Adjust divisor for zoom sensitivity
      const newZoom = Math.min(Math.max(currentZoom + zoomDelta, 1), 20);

      if (newZoom !== currentZoom) {
        map.value!.setZoom(newZoom);
      }
    });

    directionsRenderer.value = new DirectionsRenderer({
      suppressMarkers: true, // Suppress default markers
      map: map.value,
    });
    directionsService.value = new DirectionsService();

    if (props.stops.length >= 2) {
      calculateAndDisplayRoute();
    }
  } catch (e) {
    console.error("Error initializing map:", e);
    error.value = "Failed to initialize map";
  }
}

async function calculateAndDisplayRoute(): Promise<void> {
  const { AdvancedMarkerElement } = (await google.maps.importLibrary(
    "marker"
  )) as google.maps.MarkerLibrary;
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
    const origin = {
      lat: Number(props.stops[0].lat),
      lng: Number(props.stops[0].lng),
    };
    const destination = {
      lat: Number(props.stops[props.stops.length - 1].lat),
      lng: Number(props.stops[props.stops.length - 1].lng),
    };
    const waypoints = props.stops.slice(1, -1).map((stop) => ({
      location: { lat: Number(stop.lat), lng: Number(stop.lng) },
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

    // Clear all existing markers and info windows
    clearAllMarkers();

    // Add stop markers
    props.stops.forEach((stop, index) => {
      if (!isValidCoordinate(stop.lat) || !isValidCoordinate(stop.lng)) {
        console.warn(`Invalid coordinates for stop ${index}:`, stop);
        return;
      }
      const markerElement = document.createElement("div");
      markerElement.className = "marker-label";
      markerElement.textContent = String(index + 1);

      const marker = new AdvancedMarkerElement({
        position: {
          lat: Number(stop.lat),
          lng: Number(stop.lng),
        },
        map: map.value,
        title: `Stop ${index + 1}`,
        content: markerElement,
      });
      markers.value.push(marker);

      // Add activity markers for each stop
      stop.activities.forEach((activity) => {
        createActivityMarker(activity, index);
      });
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

<style lang="scss">
.map-container {
  position: relative;
  width: 100%;
}

.dots-loader {
  display: flex;
  justify-content: center;
  gap: 6px;
}

.dot {
  width: 8px;
  height: 8px;
  background-color: #ff5a5f;
  border-radius: 50%;
  animation: dotBounce 1.4s infinite ease-in-out;
}

.dot:nth-child(1) {
  animation-delay: -0.32s;
}

.dot:nth-child(2) {
  animation-delay: -0.16s;
}

.gm-style-iw-ch span {
  @apply font-semibold text-primary;
}

@keyframes dotBounce {
  0%,
  80%,
  100% {
    transform: scale(0);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

.marker-label {
  background-color: #4caf50;
  border-radius: 50%;
  color: white;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}
</style>
