<template>
  <div class="w-full max-w-2xl mx-auto">
    <UCard class="form-card">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div class="space-y-4">
          <UFormGroup label="Starting Point" class="relative">
            <div class="flex items-center">
              <UIcon
                name="i-ph-airplane-takeoff-duotone"
                class="w-5 h-5 text-gray-400 absolute left-3 z-10"
              />
              <LocationAutocomplete
                id="start-point"
                v-model="form.startPoint"
                placeholder="Where are you starting from?"
                :disabled="loading"
                @place-selected="handleStartPointSelected"
                class="pl-10"
              />
            </div>
          </UFormGroup>

          <UFormGroup label="Destination" class="relative">
            <div class="flex items-center">
              <UIcon
                name="i-ph-airplane-landing-duotone"
                class="w-5 h-5 text-gray-400 absolute left-3 z-10"
              />
              <LocationAutocomplete
                id="destination"
                v-model="form.destination"
                placeholder="Where would you like to go?"
                :disabled="loading"
                @place-selected="handleDestinationSelected"
                class="pl-10"
              />
            </div>
          </UFormGroup>

          <div class="grid grid-cols-2 gap-4">
            <UFormGroup label="Start Date" class="relative">
              <div class="flex items-center">
                <UIcon
                  name="i-ph-calendar-duotone"
                  class="w-5 h-5 text-gray-400 absolute left-3 z-10"
                />
                <UInput
                  v-model="form.startDate"
                  type="date"
                  :min="today"
                  :disabled="loading"
                  class="pl-10"
                />
              </div>
            </UFormGroup>

            <UFormGroup label="End Date" class="relative">
              <div class="flex items-center">
                <UIcon
                  name="i-ph-calendar-check-duotone"
                  class="w-5 h-5 text-gray-400 absolute left-3 z-10"
                />
                <UInput
                  v-model="form.endDate"
                  type="date"
                  :min="form.startDate || today"
                  :disabled="loading"
                  class="pl-10"
                />
              </div>
            </UFormGroup>
          </div>
        </div>

        <UButton
          type="submit"
          color="primary"
          :loading="loading"
          :disabled="!isFormValid"
          block
          class="travel-gradient"
        >
          <template #leading>
            <UIcon name="i-ph-map-trifold-duotone" class="w-5 h-5" />
          </template>
          Plan My Journey
        </UButton>
      </form>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { format } from "date-fns";
import type { TripRequest, TripResponse } from "~/types";
import dummyData from "@/mocks/benimellal-fes.json";

const loading = ref(false);
const form = ref<TripRequest>({
  startPoint: "",
  destination: "",
  startDate: "",
  endDate: "",
  nbStops: 3,
  transportationMode: "car",
  activitiesType: "adventurous",
  groupType: "family",
});

const startPointPlace = ref<google.maps.places.PlaceResult | null>(null);
const destinationPlace = ref<google.maps.places.PlaceResult | null>(null);

const today = computed(() => format(new Date(), "yyyy-MM-dd"));

const isFormValid = computed(() => {
  return (
    form.value.startPoint &&
    form.value.destination &&
    startPointPlace.value?.geometry?.location &&
    destinationPlace.value?.geometry?.location
  );
});

const emit = defineEmits<{
  submit: [TripResponse];
}>();

const handleStartPointSelected = (place: google.maps.places.PlaceResult) => {
  startPointPlace.value = place;
};

const handleDestinationSelected = (place: google.maps.places.PlaceResult) => {
  destinationPlace.value = place;
};

const handleSubmit = async () => {
  if (!isFormValid.value) return;
  loading.value = true;
  try {
    emit("submit", dummyData);
    // const response = await $fetch<TripResponse>("/api/completion", {
    //   method: "post",
    //   body: { ...form.value, preferences: "" },
    // });
    // if (response) {
    //   emit("submit", response);
    // }
  } catch {
    alert("Failed to plan your journey. Please try again later.");
  } finally {
    loading.value = false;
  }
};
</script>
