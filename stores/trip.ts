import { defineStore } from "pinia";
import type { Stop, Trip } from "~/types";

const fetchPlaceDetails = async (address: string) => {
  const { Place } = (await google.maps.importLibrary(
    "places"
  )) as google.maps.PlacesLibrary;
  try {
    const request = {
      textQuery: address,
      fields: ["photos"],
      language: "en-US",
      maxResultCount: 1,
    };
    const { places } = await Place.searchByText(request);
    const place = places?.[0] || null;
    return place;
  } catch (error) {
    console.error("Error fetching place details:", error);
    return null;
  }
};

export const useTripStore = defineStore("trip", () => {
  const mapStore = useMapStore();
  const currentTrip = ref<Trip | null>(null);
  const activitiesLoaded = ref<boolean>(false);
  const loadedStopIds = ref<Set<string>>(new Set());
  const loadedPlaceIds = ref<Set<string>>(new Set());
  const selectedStop = ref<Stop | null>(null);

  function setTrip(trip: Trip) {
    currentTrip.value = trip;
  }

  function clearTrip() {
    currentTrip.value = null;
    loadedStopIds.value.clear();
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  function setSelectedStop(stop: Stop | null) {
    selectedStop.value = stop;
    if (stop) {
      mapStore.setFocusedStop(stop);
      scrollToTop();
    } else {
      mapStore.resetMapView();
    }
  }

  async function fetchStopActivities(stopId: string) {
    if (!currentTrip.value || loadedStopIds.value.has(stopId)) return;

    const stop = currentTrip.value.stops.find((s) => s.id === stopId);
    if (!stop) return;

    for (let i = 0; i < stop.activities.length; i++) {
      const activity = stop.activities[i];
      if (!activity.locationInfo.id) continue;

      try {
        const response = await fetch(`/api/location`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: activity.locationInfo.id }),
        });

        if (!response.ok) throw new Error("Failed to fetch location details");

        const locationInfo = await response.json();
        stop.activities[i] = {
          ...activity,
          locationInfo,
        };
      } catch (error) {
        console.error(
          `Error fetching details for activity ${activity.id}:`,
          error
        );
      }
    }

    loadedStopIds.value.add(stopId);
  }

  async function fetchStopPlaceDetails(stopId: string) {
    if (!currentTrip.value || loadedPlaceIds.value.has(stopId)) return;

    const stop = currentTrip.value.stops.find((s) => s.id === stopId);
    if (!stop) return;

    const placeDetails = await fetchPlaceDetails(stop.address);

    if (placeDetails) {
      stop.placeDetails = placeDetails;
      loadedPlaceIds.value.add(stopId);
    }
  }

  return {
    setSelectedStop,
    selectedStop,
    loadedStopIds,
    activitiesLoaded,
    currentTrip,
    setTrip,
    clearTrip,
    fetchStopActivities,
    loadedPlaceIds,
    fetchStopPlaceDetails,
  };
});
