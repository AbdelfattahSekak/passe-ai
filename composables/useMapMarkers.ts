import type { Activity, Stop } from "~/types";

export function useMapMarkers() {
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

  async function createActivityMarker(
    activity: Activity,
    stopIndex: number,
    map: google.maps.Map
  ) {
    const { AdvancedMarkerElement } = (await google.maps.importLibrary(
      "marker"
    )) as google.maps.MarkerLibrary;
    const { InfoWindow } = (await google.maps.importLibrary(
      "maps"
    )) as google.maps.MapsLibrary;

    if (!isValidCoordinate(activity.lat) || !isValidCoordinate(activity.lng)) {
      console.warn("Invalid coordinates for activity:", activity);
      return;
    }

    const markerContainer = document.createElement("div");
    markerContainer.className = "activity-marker";
    markerContainer.innerHTML = `
      <div class="activity-marker-inner">
          <i class="pi pi-star"></i>
      </div>
    `;

    const marker = new AdvancedMarkerElement({
      position: { lat: Number(activity.lat), lng: Number(activity.lng) },
      map,
      content: markerContainer,
      title: activity.title,
    });

    const infoWindow = new InfoWindow({
      ariaLabel: activity.title,
      headerContent: activity.title,
      content: `<div><p class="text-sm">${activity.details}</p></div>`,
    });

    marker.addListener("click", () => {
      infoWindows.value.forEach((window) => window.close());
      infoWindow.open(map, marker);
    });

    activityMarkers.value.push(marker);
    infoWindows.value.push(infoWindow);
  }

  const createStopMarkers = async (
    stop: Stop,
    index: number,
    map: google.maps.Map
  ) => {
    const { AdvancedMarkerElement } = (await google.maps.importLibrary(
      "marker"
    )) as google.maps.MarkerLibrary;
    const { InfoWindow } = (await google.maps.importLibrary(
      "maps"
    )) as google.maps.MapsLibrary;
    if (!isValidCoordinate(stop.lat) || !isValidCoordinate(stop.lng)) {
      console.warn(`Invalid coordinates for stop ${index}:`, stop);
      return;
    }

    const markerElement = document.createElement("div");
    markerElement.className = "marker-label";
    markerElement.textContent = String(index + 1);

    const marker = new AdvancedMarkerElement({
      position: { lat: Number(stop.lat), lng: Number(stop.lng) },
      map,
      title: `Stop ${index + 1}`,
      content: markerElement,
    });
    markers.value.push(marker);

    // Add activity markers
    stop.activities.forEach((activity) => {
      createActivityMarker(activity, index, map);
    });
  };
  return {
    clearAllMarkers,
    createStopMarkers,
  };
}
