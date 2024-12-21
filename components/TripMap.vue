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
import type { Stop } from "~/types";
import { useMapInit } from "~/composables/useMapInit";
import { useMapMarkers } from "~/composables/useMapMarkers";
import { useMapRoutes } from "~/composables/useMapRoutes";

const props = defineProps<{
  stops: Stop[];
}>();

const mapContainer = ref<HTMLElement | null>(null);
const { map, error: mapError, initMap } = useMapInit();
const { createStopMarkers, clearAllMarkers } = useMapMarkers();
const {
  directionsRenderer,
  isCalculating,
  error: routeError,
  initDirections,
  calculateRoute,
} = useMapRoutes();

async function calculateAndDisplayRoute(): Promise<void> {
  if (props.stops.length < 2) return;

  isCalculating.value = true;

  try {
    const response = await calculateRoute(props.stops);
    if (!response || !directionsRenderer.value) return;

    directionsRenderer.value.setDirections(response);
    clearAllMarkers();

    props.stops.forEach((stop, index) => {
      createStopMarkers(stop, index, toRaw(map.value!));
    });

    await new Promise((resolve) => setTimeout(resolve, 500));
  } catch (e) {
    console.error("Route calculation error:", e);
  } finally {
    isCalculating.value = false;
  }
}

onMounted(async () => {
  if (!mapContainer.value) return;

  const mapInstance = await initMap(mapContainer.value);
  if (!mapInstance) return;

  await initDirections(mapInstance);

  if (props.stops.length >= 2) {
    calculateAndDisplayRoute();
  }
});

watch(
  () => props.stops,
  (newStops) => {
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
  background-color: #ff5a5f;
  border-radius: 50%;
  color: white;
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 16px;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.activity-marker {
  transform: scale(0);
  animation: popIn 0.3s ease-out forwards;
}
.activity-marker-inner {
  background: #2196f3;
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  border: 2px solid white;
  transition: all 0.2s ease;
  cursor: pointer;
}
.activity-marker-inner:hover {
  transform: scale(1.1);
  background: #1976d2;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}
@keyframes popIn {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}
</style>
