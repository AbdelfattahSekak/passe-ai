<template>
  <div class="min-h-screen bg-gray-50">
    <header class="travel-gradient text-white py-12 mb-8">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-center space-x-2">
          <UIcon name="i-ph-airplane-tilt-duotone" class="w-10 h-10" />
          <h1 class="text-4xl font-bold text-center">Journey Planner</h1>
        </div>
        <p class="text-center mt-2 text-white/90">
          Plan your perfect adventure with ease
        </p>
      </div>
    </header>

    <main class="container mx-auto px-4 pb-12">
      <TripPlannerForm @submit="handleFormSubmit" />

      <div
        v-if="stops.length"
        class="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        <div class="order-2 lg:order-1">
          <div class="sticky top-4">
            <h2 class="text-2xl font-bold mb-4 flex items-center">
              <UIcon
                name="i-ph-map-pin-line-duotone"
                class="w-6 h-6 mr-2 text-blue-500"
              />
              Your Itinerary
            </h2>
            <ItineraryList :stops="stops" />
          </div>
        </div>

        <div class="order-1 lg:order-2">
          <h2 class="text-2xl font-bold mb-4 flex items-center">
            <UIcon
              name="i-ph-map-trifold-duotone"
              class="w-6 h-6 mr-2 text-blue-500"
            />
            Trip Overview
          </h2>
          <InteractiveMap :stops="stops" />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Stop, TripResponse } from "~/types";

const stops = ref<Stop[]>([]);

const handleFormSubmit = async (data: TripResponse) => {
  stops.value = data.stops;
};
</script>
