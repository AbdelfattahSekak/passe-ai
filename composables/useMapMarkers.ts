import type { Activity, Stop } from "~/types";

export function useMapMarkers(map: Ref<google.maps.Map | null>) {
  const markers = ref<google.maps.marker.AdvancedMarkerElement[]>([]);
  const activityMarkers = ref<google.maps.marker.AdvancedMarkerElement[]>([]);
  const infoWindows = ref<google.maps.InfoWindow[]>([]);
  const tripStore = useTripStore();
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
    map: google.maps.Map
  ) {
    const { AdvancedMarkerElement } = (await google.maps.importLibrary(
      "marker"
    )) as google.maps.MarkerLibrary;
    const { InfoWindow } = (await google.maps.importLibrary(
      "maps"
    )) as google.maps.MapsLibrary;
    const coordinates = {
      lat: Number(activity.locationInfo.details!.latitude),
      lng: Number(activity.locationInfo.details!.longitude),
    };
    if (
      !isValidCoordinate(coordinates.lat) ||
      !isValidCoordinate(coordinates.lng)
    ) {
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
      position: coordinates,
      map,
      content: markerContainer,
      title: activity.title,
    });

    const infoWindow = new InfoWindow({
      ariaLabel: activity.title,
      content: `
        <div class="info-window-content">
          <h3>${activity.title}</h3>
          <p>${activity.details}</p>
        </div>
      `,
      pixelOffset: new google.maps.Size(0, -10),
    });

    let isOpen = false;

    marker.addListener("click", () => {
      infoWindows.value.forEach((window) => window.close());
      infoWindow.open(map, marker);
      isOpen = true;
      markerContainer.classList.add("pulse");
    });

    marker.addListener("mouseenter", () => {
      if (!isOpen) {
        markerContainer.classList.add("pulse");
      }
    });

    marker.addListener("mouseleave", () => {
      if (!isOpen) {
        markerContainer.classList.remove("pulse");
      }
    });

    infoWindow.addListener("closeclick", () => {
      isOpen = false;
      markerContainer.classList.remove("pulse");
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

    // Create stop info window content
    const createStopContent = () => {
      return `
        <div class="stop-info-window p-4">
          <div class="flex flex-col gap-2">
            <h2 class="text-xl font-bold">${stop.title}</h2>
            <p class="text-sm text-text-secondary flex items-center gap-2">
              <i class="pi pi-map-marker text-primary"></i>
              ${stop.address}
            </p>
          </div>
          <div class="mt-2">
            <div>
              ${
                stop.locationInfo?.photos?.[0]
                  ? `<img src="${stop.locationInfo.photos[0].url}" alt="${stop.title}" class="w-full h-32 object-cover">`
                  : ""
              }
            </div>
            <div >
              <div class="p-2 flex flex-col gap-4">
                <p class="text-text-primary">${stop.details}</p>
               
              </div>
            </div>
          </div>
        </div>
      `;
    };

    const stopInfoWindow = new InfoWindow({
      content: createStopContent(),
      maxWidth: 320,
      pixelOffset: new google.maps.Size(0, -20),
    });

    const marker = new AdvancedMarkerElement({
      position: { lat: Number(stop.lat), lng: Number(stop.lng) },
      map,
      title: `Stop ${index + 1}`,
      content: markerElement,
      zIndex: 100, // Ensure stop markers are above activity markers
    });

    let activityMarkersVisible = true;
    let isInfoWindowOpen = false;

    marker.addListener("click", () => {
      // Close all other info windows first
      infoWindows.value.forEach((window) => window.close());

      if (!isInfoWindowOpen) {
        stopInfoWindow.open(map, marker);
        isInfoWindowOpen = true;
        markerElement.classList.add("active");
      } else {
        stopInfoWindow.close();
        isInfoWindowOpen = false;
        markerElement.classList.remove("active");
      }

      // Toggle activity markers
      activityMarkersVisible = !activityMarkersVisible;
      stop.activities.forEach((_, i) => {
        const activityMarker =
          activityMarkers.value[index * stop.activities.length + i];
        if (activityMarker) {
          activityMarker.map = activityMarkersVisible ? map : null;
        }
      });
    });

    stopInfoWindow.addListener("closeclick", () => {
      isInfoWindowOpen = false;
      markerElement.classList.remove("active");
    });

    markers.value.push(marker);
    infoWindows.value.push(stopInfoWindow);
  };

  //   Watch for changes in currentTrip and update markers
  watch(tripStore.loadedStopIds, (value) => {
    if (
      tripStore.currentTrip &&
      value.size < tripStore.currentTrip.stops.length
    ) {
      const loadedStopIdsArray = Array.from(tripStore.loadedStopIds);
      const stop = tripStore.currentTrip.stops.find(
        (stop) => stop.id === loadedStopIdsArray.at(-1)
      );

      if (!stop) return;
      stop.activities.forEach((activity) => {
        createActivityMarker(activity, map.value!);
      });
    }
  });

  return {
    clearAllMarkers,
    createStopMarkers,
  };
}
