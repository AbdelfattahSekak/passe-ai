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
      <main
        v-if="itinerary"
        class="flex h-full md:flex-row flex-col gap-4 p-4"
        role="main"
      >
        <div
          class="flex-1 min-h-[500px] md:h-[calc(100vh-600px)] bg-white shadow-lg overflow-y-auto rounded-lg"
          role="complementary"
          aria-label="Trip Itinerary"
        >
          <TripItinerary :stops="itinerary.stops" />
        </div>
        <div
          class="flex-1 min-h-[500px] md:h-[calc(100vh-600px)]"
          role="complementary"
          aria-label="Trip Map"
        >
          <TripMap :stops="itinerary.stops" />
        </div>
      </main>
      <div class="fixed bottom-8 right-8">
        <Button
          @click="saveCurrentTrip"
          class="p-4 shadow-lg"
          :disabled="isSaving"
          :loading="isSaving"
          label="Save Trip"
        />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import dummyData from "@/mocks/beni-fes.json";
import { generateMetaTags } from "~/utils/seo";
import type { SearchFormData, SavedTrip } from "~/types";

const route = useRoute();
const { savedTrips, saveTrip } = useSavedTrips();
const itinerary = ref<SavedTrip | null>(null);
const isSaving = ref(false);

const handleSearch = async (formData: SearchFormData) => {
  // TODO: Replace with actual API call
  console.log(formData);
  itinerary.value = {
    ...(dummyData as unknown as SavedTrip),
    start: formData.start,
    destination: formData.destination,
  };
};

const handleTripSelect = (trip: SavedTrip) => {
  // TODO: Replace with actual API call to get trip details
  console.log("Selected trip:", trip);
  itinerary.value = dummyData as unknown as SavedTrip;
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
  ],
});
</script>
