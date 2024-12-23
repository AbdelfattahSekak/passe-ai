<template>
  <div class="map-container">
    <LoadingOverlay v-if="isCalculating" />
    <div
      ref="mapContainer"
      id="map"
      class="w-full h-[calc(100vh-20vh-60px)]"
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
  height: 100%;

  // Add a subtle transition for smoother position changes
  transition: transform 0.3s ease;
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
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 16px;
  border: 3px solid white;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.25);
  }

  &.active {
    transform: scale(1.1);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.25);
    background-color: #e41e26;
  }
}

.activity-marker {
  transform: scale(0);
  animation: popIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;

  &.pulse {
    animation: pulse 2s infinite;
  }
}

.activity-marker-inner {
  background: #2196f3;
  color: white;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  border: 2px solid white;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;

  &:hover {
    transform: scale(1.15);
    background: #1976d2;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }

  i {
    font-size: 1.1rem;
    transition: transform 0.3s ease;
  }

  &:hover i {
    transform: rotate(72deg);
  }
}

// Custom InfoWindow styles
.gm-style .gm-style-iw-c {
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);

  .gm-style-iw-d {
    overflow: hidden !important;
  }
}

.info-window-content {
  min-width: 200px;

  h3 {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 8px;
    color: #1a1a1a;
  }

  p {
    font-size: 0.95rem;
    line-height: 1.5;
    color: #4a4a4a;
  }
}

.stop-info-window {
  min-width: 250px;
  padding: 8px 0;

  .stop-title {
    font-size: 1.2rem;
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 12px;
    border-bottom: 2px solid #ff5a5f;
    padding-bottom: 8px;
  }

  .stop-description {
    font-size: 0.95rem;
    line-height: 1.5;
    color: #4a4a4a;
    margin-bottom: 16px;
  }

  .activities-section {
    .activities-title {
      font-size: 1rem;
      font-weight: 500;
      color: #2196f3;
      margin-bottom: 8px;
    }

    .activities-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .stop-activity-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 6px 0;
      font-size: 0.9rem;
      color: #666;

      &:hover {
        color: #2196f3;
      }

      i {
        font-size: 0.8rem;
      }
    }
  }
}

// Improve InfoWindow close button
.gm-style .gm-style-iw-t button {
  top: 0 !important;
  right: 0 !important;
  width: 24px !important;
  height: 24px !important;
  background-color: white !important;
  border-radius: 50% !important;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2) !important;
  transform: translate(50%, -50%) !important;

  &:hover {
    background-color: #f5f5f5 !important;
  }
}

@keyframes popIn {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  70% {
    transform: scale(1.1);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
