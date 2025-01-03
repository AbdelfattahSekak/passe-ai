<template>
  <div
    :class="[
      'transition-all duration-300 ease-in-out',
      expanded
        ? 'fixed top-[100px] left-0 right-0 z-50 bg-white'
        : 'sticky top-[100px]',
    ]"
  >
    <div class="map-container flex">
      <LoadingOverlay v-if="isCalculating" />
      <!-- <Button
        @click="toggleExpand"
        class="absolute top-4 left-4 z-10 bg-white"
        :aria-label="expanded ? 'Collapse map' : 'Expand map'"
        size="large"
        raised
        rounded
        :icon="expanded ? 'pi pi-angle-right' : 'pi pi-angle-left'"
      /> -->
      <div
        ref="mapContainer"
        id="map"
        :class="[
          'w-full transition-all duration-300',
          'h-[calc(100vh-100px)]', // Keep consistent height in both modes
        ]"
        role="region"
        aria-label="Interactive Map"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, toRaw } from "vue";
import type { Stop } from "~/types";
import { useMapInit } from "~/composables/useMapInit";
import { useMapMarkers } from "~/composables/useMapMarkers";
import { useMapRoutes } from "~/composables/useMapRoutes";
import { useMapAnimations } from "~/composables/useMapAnimations";
import { useMapStore } from "~/stores/map";

const props = defineProps<{
  stops: Stop[];
  focusedStop?: Stop;
}>();

const expanded = ref(false);
const mapContainer = ref<HTMLElement | null>(null);
const { map, error: mapError, initMap } = useMapInit();
const { createStopMarkers, clearAllMarkers } = useMapMarkers(map);
const {
  directionsRenderer,
  isCalculating,
  error: routeError,
  initDirections,
  calculateRoute,
} = useMapRoutes(map);

const mapStore = useMapStore();

const { animateViewToPosition, animateViewToBounds } = useMapAnimations();

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

function toggleExpand() {
  expanded.value = !expanded.value;
  // Give the DOM time to update before resizing the map
  setTimeout(() => {
    if (map.value) {
      google.maps.event.trigger(map.value, "resize");
    }
  }, 300);
}

function focusOnStop(stop: Stop) {
  if (!map.value) return;

  const position = {
    lat: stop.lat,
    lng: stop.lng,
  };

  animateViewToPosition(map.value, position);
}

function resetView() {
  if (!map.value || props.stops.length < 2) return;

  const bounds = new google.maps.LatLngBounds();
  props.stops.forEach((stop) => {
    bounds.extend({ lat: stop.lat, lng: stop.lng });
  });

  animateViewToBounds(map.value, bounds);
}

watch(
  () => mapStore.shouldResetView,
  (shouldReset) => {
    if (shouldReset) {
      resetView();
      mapStore.clearResetFlag();
    }
  }
);

watch(
  () => mapStore.focusedStop,
  (newStop) => {
    if (newStop) {
      focusOnStop(newStop);
    }
  }
);

// Add this watch effect after other watch statements
watch(
  () => mapStore.hoveredStopId,
  (hoveredId) => {
    if (!map.value) return;

    // Find the marker element for the hovered stop
    const markerElements = document.querySelectorAll(".marker-label");
    markerElements.forEach((element, index) => {
      const stop = props.stops[index];
      if (stop.id === hoveredId) {
        element.classList.add("hover");
      } else {
        element.classList.remove("hover");
      }
    });
  }
);

onMounted(async () => {
  if (!mapContainer.value) return;

  const mapInstance = await initMap(mapContainer.value);
  if (!mapInstance) return;

  await initDirections(mapInstance);

  if (props.stops.length >= 2) {
    await calculateAndDisplayRoute();
    resetView();
  }
});
</script>

<style lang="scss">
.p-button {
  position: absolute;
}
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

.gm-style-iw.gm-style-iw-c {
  padding: 0;
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

  &.hover {
    transform: scale(1.2);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
    background-color: #e41e26;
    animation: bounce 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
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

@keyframes bounce {
  0%,
  100% {
    transform: scale(1.2);
  }
  50% {
    transform: scale(1.3);
  }
}

.activity-marker-attractions {
  background: rgba(168, 85, 247, 0.9);
  color: white;
}

.activity-marker-restaurants {
  background: rgba(245, 158, 11, 0.9);
  color: white;
}

.activity-marker-hotels {
  background: rgba(16, 185, 129, 0.9);
  color: white;
}

.activity-marker .pi {
  font-size: 1rem;
}

.route-info-content {
  background: rgba(255, 255, 255, 0.9);
  padding: 5px 10px;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transform: scale(0.95); // Slightly reduced from 1.0
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1);
    background: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  .route-info-text {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: system-ui, -apple-system, sans-serif;

    span:first-child {
      font-size: 11px;
      font-weight: 600;
      color: #1a1a1a;
    }

    .route-info-header {
      display: flex;
      align-items: center;
      gap: 5px;

      i {
        font-size: 14px; // Reduced from 16px
        color: #666;
      }

      span {
        font-size: 14px; // Reduced from 16px
        font-weight: 600;
        color: #1a1a1a;
      }
    }

    span:last-child {
      font-size: 12px; // Reduced from 14px
      color: #666;
      margin-top: 1px;
    }
  }
}

// Add this to the existing animations
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(0.95); // Match the new scale
  }
}

.route-info-marker {
  animation: fadeIn 0.3s ease forwards;
}
</style>
