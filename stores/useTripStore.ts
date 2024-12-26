import { defineStore } from "pinia";
import type { Trip } from "~/types";

export const useTripStore = defineStore("trip", () => {
  const currentTrip = ref<Trip | null>(null);
  const activitiesLoaded = ref<boolean>(false);
  function setTrip(trip: Trip) {
    currentTrip.value = trip;
  }

  function clearTrip() {
    currentTrip.value = null;
  }

  async function fetchAllActivitiesDetails() {
    if (!currentTrip.value) return;

    for (const stop of currentTrip.value.stops) {
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
    }
  }

  return {
    activitiesLoaded,
    currentTrip,
    setTrip,
    clearTrip,
    fetchAllActivitiesDetails,
  };
});
