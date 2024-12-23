import type { Ref } from "vue";

export function useMapInit() {
  const map = shallowRef<google.maps.Map | null>(null);
  const error = ref<string | null>(null);

  async function initMap(mapContainer: HTMLElement) {
    const { Map } = (await google.maps.importLibrary(
      "maps"
    )) as google.maps.MapsLibrary;

    try {
      map.value = new Map(mapContainer, {
        mapId: "2b29b215e8e5f5ee",
        zoom: 7,
        center: { lat: 41.85, lng: -87.65 },
        disableDefaultUI: false,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        zoomControl: true,
        gestureHandling: "greedy",
        scrollwheel: true,
      });

      // Add smooth zoom behavior
      map.value.addListener("wheel", (event: WheelEvent) => {
        const delta = event.deltaY;
        const currentZoom = map.value!.getZoom() || 7;
        const zoomDelta = -delta / 200;
        const newZoom = Math.min(Math.max(currentZoom + zoomDelta, 1), 20);

        if (newZoom !== currentZoom) {
          map.value!.setZoom(newZoom);
        }
      });

      return map.value;
    } catch (e) {
      console.error("Error initializing map:", e);
      error.value = "Failed to initialize map";
      return null;
    }
  }

  return {
    map,
    error,
    initMap,
  };
}
