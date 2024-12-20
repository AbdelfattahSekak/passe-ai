<template>
  <div class="bg-white flex flex-col">
    <TheHeader>
      <SearchForm @submit="handleSearch" />
    </TheHeader>

    <template v-if="!itinerary">
      <TripSuggestions @select="handleTripSelect" />
      <TravelIcons />
    </template>

    <template v-else>
      <main
        v-if="itinerary"
        class="flex flex-col sm:flex-col md:flex-row gap-4"
        role="main"
      >
        <div
          class="w-full md:w-1/2 lg:w-2/3 min-h-[500px] bg-white order-2 sm:order-2 md:order-1"
          role="complementary"
          aria-label="Trip Itinerary"
        >
          <TripItinerary :stops="itinerary.stops" />
        </div>
        <div
          class="w-full md:w-1/2 lg:w-1/3 order-1 sm:order-1 md:order-2"
          role="complementary"
          aria-label="Trip Map"
        >
          <TripMap :stops="itinerary.stops" />
        </div>
      </main>
      <!-- <div class="fixed bottom-8 right-8">
        <Button
          @click="saveCurrentTrip"
          class="p-4 shadow-lg"
          :disabled="isSaving"
          :loading="isSaving"
          label="Save Trip"
        />
      </div> -->
    </template>
  </div>
</template>

<script setup lang="ts">
import dummyData from "~/mocks/inference.json";
import { generateMetaTags } from "~/utils/seo";
import type { SearchFormData, SavedTrip, InferenceResponse } from "~/types";
import { v4 as uuidv4 } from "uuid";
import useLocationId from "~/composables/useLocationId";

const route = useRoute();
const { savedTrips, saveTrip } = useSavedTrips();
const itinerary = ref<SavedTrip | null>(null);
const isSaving = ref(false);
const config = useRuntimeConfig();
const { getLocationInfo } = useLocationId();

const enrichItineraryWithLocationIds = async (
  itineraryData: InferenceResponse
) => {
  const enrichedStops = await Promise.all(
    itineraryData.stops.map(async (stop) => {
      const locationInfo = await getLocationInfo(stop.address);
      return {
        ...stop,
        ...locationInfo,
      };
    })
  );

  return {
    ...itineraryData,
    stops: enrichedStops,
  };
};

const handleSearch = async (formData: SearchFormData) => {
  try {
    // const result = (await $fetch("/api/inference", {
    //   method: "POST",
    //   body: formData,
    // })) as {
    //   stops: Stop[];
    // };
    const enrichedItinerary = await enrichItineraryWithLocationIds(
      dummyData as unknown as InferenceResponse
    );
    itinerary.value = {
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      start: formData.start,
      destination: formData.destination,
      ...enrichedItinerary,
    };
    console.log(itinerary.value);
  } catch (error) {
    console.error("Error processing itinerary:", error);
  }
};

const handleTripSelect = async (trip: SavedTrip) => {
  console.log("Selected trip:", trip);
  const enrichedItinerary = await enrichItineraryWithLocationIds(
    dummyData as unknown as SavedTrip
  );
  itinerary.value = enrichedItinerary;
};

const saveCurrentTrip = () => {
  if (!itinerary.value) return;

  isSaving.value = true;
  try {
    saveTrip({
      name: `${itinerary.value.start} to ${itinerary.value.destination}`,
      start: itinerary.value.start,
      destination: itinerary.value.destination,
      stops: itinerary.value.stops,
    } as Omit<SavedTrip, "id" | "createdAt">);

    // Show success message
  } catch (error) {
    console.error("Error saving trip:", error);
    // Show error message
  } finally {
    isSaving.value = false;
  }
};

// Load saved trip if tripId is present in URL
onMounted(() => {
  const tripId = route.query.tripId as string;
  if (tripId) {
    const trip = savedTrips.value.find((t) => t.id === tripId);
    if (trip) {
      itinerary.value = trip;
    }
  }
});

useHead(
  generateMetaTags({
    title: "AI-Powered Road Trip Planner",
    description:
      "Plan your perfect road trip with Passe.ai. Our AI-powered itinerary builder helps you discover hidden gems and create unforgettable memories.",
    path: "/",
  })
);

useHead({
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Passe.ai",
        description:
          "AI-powered road trip planner helping travelers create personalized itineraries.",
        applicationCategory: "TravelApplication",
        operatingSystem: "Web",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        author: {
          "@type": "Organization",
          name: "Passe.ai",
          url: "https://passe.ai",
        },
      }),
    },
    {
      async: true,
      src: `https://maps.googleapis.com/maps/api/js?key=${config.public.GOOGLE_MAPS_API_KEY}&libraries=places`,
    },
  ],
});
</script>
