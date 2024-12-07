import { ref, onMounted } from "vue";
import { v4 as uuidv4 } from "uuid";
import type { SavedTrip } from "~/types";

export const useSavedTrips = () => {
  const savedTrips = ref<SavedTrip[]>([]);

  const loadTrips = () => {
    const stored = localStorage.getItem("savedTrips");
    if (stored) {
      savedTrips.value = JSON.parse(stored);
    }
  };

  const saveTrip = (trip: Omit<SavedTrip, "id" | "createdAt">) => {
    const newTrip: SavedTrip = {
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      ...trip,
    };

    savedTrips.value.push(newTrip);
    localStorage.setItem("savedTrips", JSON.stringify(savedTrips.value));
    return newTrip;
  };

  const deleteTrip = (id: string) => {
    savedTrips.value = savedTrips.value.filter((trip) => trip.id !== id);
    localStorage.setItem("savedTrips", JSON.stringify(savedTrips.value));
  };

  onMounted(() => {
    loadTrips();
  });

  return {
    savedTrips,
    saveTrip,
    deleteTrip,
  };
};
