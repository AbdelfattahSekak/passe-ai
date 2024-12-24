import { defineStore } from 'pinia';
import type { Trip } from '~/types';

export const useTripStore = defineStore('trip', () => {
  const currentTrip = ref<Trip | null>(null);

  function setTrip(trip: Trip) {
    currentTrip.value = trip;
  }

  function clearTrip() {
    currentTrip.value = null;
  }

  return {
    currentTrip,
    setTrip,
    clearTrip,
  };
});
