import type { Stop } from "~/types";

export function useMapRoutes() {
  const directionsService = ref<google.maps.DirectionsService | null>(null);
  const directionsRenderer = ref<google.maps.DirectionsRenderer | null>(null);
  const isCalculating = ref(false);
  const error = ref<string | null>(null);

  async function initDirections(map: google.maps.Map) {
    const { DirectionsRenderer, DirectionsService } = await google.maps.importLibrary("routes") as google.maps.RoutesLibrary;
    
    directionsRenderer.value = new DirectionsRenderer({
      suppressMarkers: true,
      map: map,
    });
    directionsService.value = new DirectionsService();
  }

  async function calculateRoute(stops: Stop[]) {
    if (!directionsService.value || !directionsRenderer.value || stops.length < 2) {
      return null;
    }

    const origin = {
      lat: Number(stops[0].lat),
      lng: Number(stops[0].lng),
    };
    const destination = {
      lat: Number(stops[stops.length - 1].lat),
      lng: Number(stops[stops.length - 1].lng),
    };
    const waypoints = stops.slice(1, -1).map((stop) => ({
      location: { lat: Number(stop.lat), lng: Number(stop.lng) },
      stopover: true,
    }));

    try {
      const response = await directionsService.value.route({
        origin,
        destination,
        waypoints,
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.DRIVING,
      });

      return response;
    } catch (e) {
      console.error("Direction service error:", e);
      error.value = "Failed to calculate route";
      return null;
    }
  }

  return {
    directionsRenderer,
    isCalculating,
    error,
    initDirections,
    calculateRoute,
  };
}
