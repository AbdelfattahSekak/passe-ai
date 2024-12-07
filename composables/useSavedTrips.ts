import { ref, onMounted } from 'vue';
import type { SavedTrip } from '~/types/trip';

export const useSavedTrips = () => {
  const savedTrips = ref<SavedTrip[]>([]);

  const loadTrips = () => {
    const stored = localStorage.getItem('savedTrips');
    if (stored) {
      savedTrips.value = JSON.parse(stored);
    }
  };

  const saveTrip = (trip: Omit<SavedTrip, 'id' | 'createdAt'>) => {
    const newTrip: SavedTrip = {
      ...trip,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    };
    
    savedTrips.value.push(newTrip);
    localStorage.setItem('savedTrips', JSON.stringify(savedTrips.value));
    return newTrip;
  };

  const deleteTrip = (id: string) => {
    savedTrips.value = savedTrips.value.filter(trip => trip.id !== id);
    localStorage.setItem('savedTrips', JSON.stringify(savedTrips.value));
  };

  onMounted(() => {
    loadTrips();
  });

  return {
    savedTrips,
    saveTrip,
    deleteTrip
  };
};