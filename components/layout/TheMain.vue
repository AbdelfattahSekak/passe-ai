<template>
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
</template>

<script setup lang="ts">
defineProps<{
  itinerary: {
    stops: Array<{
      title: string;
      coordinates: string;
      details: string;
    }>;
  } | null;
}>();
</script>