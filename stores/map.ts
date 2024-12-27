import { defineStore } from "pinia";
import type { Stop } from "~/types";

export const useMapStore = defineStore("map", () => {
  const focusedStop = ref<Stop | null>(null);
  const shouldResetView = ref(false);
  const hoveredStopId = ref<string | null>(null);

  function setFocusedStop(stop: Stop | null) {
    focusedStop.value = stop;
  }

  function resetMapView() {
    focusedStop.value = null;
    shouldResetView.value = true;
  }

  function clearResetFlag() {
    shouldResetView.value = false;
  }

  function setHoveredStop(stopId: string | null) {
    hoveredStopId.value = stopId;
  }

  return {
    focusedStop,
    shouldResetView,
    setFocusedStop,
    resetMapView,
    clearResetFlag,
    hoveredStopId,
    setHoveredStop,
  };
});
