import type { Stop } from "~/types";

export function useMapRoutes(map: Ref<google.maps.Map | null>) {
  const directionsService = ref<google.maps.DirectionsService | null>(null);
  const directionsRenderer = ref<google.maps.DirectionsRenderer | null>(null);
  const isCalculating = ref(false);
  const error = ref<string | null>(null);
  const routeInfoMarkers = ref<google.maps.marker.AdvancedMarkerElement[]>([]);

  async function initDirections(map: google.maps.Map) {
    const { DirectionsRenderer, DirectionsService } =
      (await google.maps.importLibrary("routes")) as google.maps.RoutesLibrary;

    directionsRenderer.value = new DirectionsRenderer({
      suppressMarkers: true,
      map: map,
    });
    directionsService.value = new DirectionsService();
  }

  function clearRouteInfoMarkers() {
    routeInfoMarkers.value.forEach((marker) => (marker.map = null));
    routeInfoMarkers.value = [];
  }

  async function createRouteInfoMarker(
    position: google.maps.LatLng,
    content: string,
    map: google.maps.Map
  ) {
    const { AdvancedMarkerElement } = (await google.maps.importLibrary(
      "marker"
    )) as google.maps.MarkerLibrary;

    const element = document.createElement("div");
    element.className = "route-info-marker";
    element.innerHTML = content;

    const marker = new AdvancedMarkerElement({
      position,
      map,
      content: element,
    });

    console.log("marker", marker);

    routeInfoMarkers.value.push(marker);
  }

  async function findMidpointOfPath(leg: google.maps.DirectionsLeg): Promise<google.maps.LatLng> {
    const steps = leg.steps;
    let totalDistance = 0;
    steps.forEach(step => totalDistance += step.distance?.value || 0);
    
    let distanceCovered = 0;
    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      distanceCovered += step.distance?.value || 0;
      
      if (distanceCovered >= totalDistance / 2) {
        // Find the precise midpoint within this step
        const path = step.path;
        if (!path || path.length < 2) return step.start_location;
        
        let stepDistance = 0;
        for (let j = 1; j < path.length; j++) {
          const segmentDistance = google.maps.geometry.spherical.computeDistanceBetween(
            path[j-1],
            path[j]
          );
          if (stepDistance + segmentDistance >= step.distance!.value / 2) {
            // Interpolate the exact midpoint
            const fraction = (step.distance!.value / 2 - stepDistance) / segmentDistance;
            return google.maps.geometry.spherical.interpolate(path[j-1], path[j], fraction);
          }
          stepDistance += segmentDistance;
        }
        return step.start_location;
      }
    }
    return leg.steps[Math.floor(steps.length / 2)].start_location;
  }

  async function displayRouteInfo(
    response: google.maps.DirectionsResult,
    map: google.maps.Map
  ) {
    clearRouteInfoMarkers();

    const route = response.routes[0];
    const legs = route.legs;

    for (let i = 0; i < legs.length; i++) {
      const leg = legs[i];
      const midpoint = await findMidpointOfPath(leg);

      const duration = leg.duration?.text || "";
      const distance = leg.distance?.text || "";

      const content = `
        <div class="route-info-content">
          <div class="route-info-text">
            <div class="route-info-header">
              <i class="pi pi-car"></i>
              <span>${duration}</span>
            </div>
            <span>${distance}</span>
          </div>
        </div>
      `;

      await createRouteInfoMarker(midpoint, content, map);
    }
  }

  async function calculateRoute(stops: Stop[]) {
    if (
      !directionsService.value ||
      !directionsRenderer.value ||
      stops.length < 2
    ) {
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

      if (map.value) {
        await displayRouteInfo(response, map.value);
      }

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
    clearRouteInfoMarkers,
  };
}
