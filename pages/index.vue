<template>
  <div>
    <TheHeader class="mt-16">
      <SearchForm @submit="handleSearch" />
    </TheHeader>
    
    <template v-if="!itinerary">
      <TripSuggestions @select="handleTripSelect" />
      <TravelIcons />
    </template>
    
    <template v-else>
      <TheMain :itinerary="itinerary" />
      <div class="fixed bottom-8 right-8">
        <Button
          @click="saveCurrentTrip"
          class="p-4 shadow-lg"
          :disabled="isSaving"
        >
          <template #loading>
            <i class="pi pi-spin pi-spinner mr-2"></i>
            Saving...
          </template>
          <template #default>
            <i class="pi pi-save mr-2"></i>
            Save Trip
          </template>
        </Button>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import dummyData from "@/mocks/beni-fes.json";
import { generateMetaTags } from '~/utils/seo';

const route = useRoute();
const { savedTrips, saveTrip } = useSavedTrips();
const itinerary = ref<any>(null);
const isSaving = ref(false);

const handleSearch = async (formData: any) => {
  // TODO: Replace with actual API call
  console.log(formData);
  itinerary.value = {
    ...dummyData,
    start: formData.start,
    destination: formData.destination
  };
};

const handleTripSelect = (trip: any) => {
  // TODO: Replace with actual API call to get trip details
  console.log('Selected trip:', trip);
  itinerary.value = dummyData;
};

const saveCurrentTrip = () => {
  if (!itinerary.value) return;
  
  isSaving.value = true;
  try {
    saveTrip({
      name: `${itinerary.value.start} to ${itinerary.value.destination}`,
      start: itinerary.value.start,
      destination: itinerary.value.destination,
      stops: itinerary.value.stops
    });
    
    // Show success message
  } catch (error) {
    console.error('Error saving trip:', error);
    // Show error message
  } finally {
    isSaving.value = false;
  }
};

// Load saved trip if tripId is present in URL
onMounted(() => {
  const tripId = route.query.tripId as string;
  if (tripId) {
    const trip = savedTrips.value.find(t => t.id === tripId);
    if (trip) {
      itinerary.value = trip;
    }
  }
});

useHead(generateMetaTags({
  title: 'AI-Powered Road Trip Planner',
  description: 'Plan your perfect road trip with Passe.ai. Our AI-powered itinerary builder helps you discover hidden gems and create unforgettable memories.',
  path: '/'
}));

useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Passe.ai',
        description: 'AI-powered road trip planner helping travelers create personalized itineraries.',
        applicationCategory: 'TravelApplication',
        operatingSystem: 'Web',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD'
        },
        author: {
          '@type': 'Organization',
          name: 'Passe.ai',
          url: 'https://passe.ai'
        }
      })
    }
  ]
});
</script>