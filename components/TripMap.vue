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
      class="w-full h-full min-h-[700px] rounded-lg shadow-md"
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
const markers = ref<google.maps.Marker[]>([]);
const activityMarkers = ref<google.maps.Marker[]>([]);
const infoWindows = ref<google.maps.InfoWindow[]>([]);

const mapStyles = [
  {
    featureType: "administrative",
    elementType: "labels.text.fill",
    stylers: [{ color: "#484848" }],
  },
  {
    featureType: "landscape",
    elementType: "all",
    stylers: [{ color: "#f2f2f2" }],
  },
  {
    featureType: "poi",
    elementType: "all",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "road",
    elementType: "all",
    stylers: [{ saturation: -100 }, { lightness: 45 }],
  },
  {
    featureType: "road.highway",
    elementType: "all",
    stylers: [{ visibility: "simplified" }],
  },
  {
    featureType: "road.arterial",
    elementType: "labels.icon",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "transit",
    elementType: "all",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "water",
    elementType: "all",
    stylers: [{ color: "#dbdbdb" }, { visibility: "on" }],
  },
];

function clearMarkers() {
  markers.value.forEach((marker) => marker.setMap(null));
  markers.value = [];
}

function clearAllMarkers() {
  clearMarkers();
  activityMarkers.value.forEach((marker) => marker.setMap(null));
  activityMarkers.value = [];
  infoWindows.value.forEach((window) => window.close());
  infoWindows.value = [];
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

function createActivityMarker(activity: Activity, stopIndex: number): void {
  if (!isValidCoordinate(activity.lat) || !isValidCoordinate(activity.lng)) {
    console.warn("Invalid coordinates for activity:", activity);
    return;
  }

  const marker = new google.maps.Marker({
    position: {
      lat: Number(activity.lat),
      lng: Number(activity.lng),
    },
    map: map.value,
    icon: {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 8,
      fillColor: "#4CAF50",
      fillOpacity: 1,
      strokeColor: "#FFFFFF",
      strokeWeight: 2,
    },
  });

  const infoWindow = new google.maps.InfoWindow({
    ariaLabel: activity.title,
    headerContent: activity.title,
    // content: `
    //   <div>
    //     <p class="text-sm">${activity.details}</p>
    //     ${
    //       activity.images.length
    //         ? `<img src="${activity.images[0].url}" alt="${activity.images[0].description}" class="w-32 h-32 object-cover mt-2">`
    //         : ""
    //     }
    //   </div>
    // `,
  });

  marker.addListener("click", () => {
    infoWindows.value.forEach((window) => window.close());
    infoWindow.open(map.value, marker);
  });

  activityMarkers.value.push(marker);
  infoWindows.value.push(infoWindow);
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
      mapTypeControl: false, // Hide map type control for cleaner look
      streetViewControl: false, // Hide street view for cleaner look
      fullscreenControl: false, // Hide fullscreen control for cleaner look
      zoomControl: true,
      gestureHandling: "greedy", // Enables one-finger zoom on mobile
      scrollwheel: true, // Enables mouse wheel zoom
      styles: mapStyles, // Apply custom styles
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_CENTER,
      },
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
</style>
