<template>
  <div
    class="bg-white max-w-[1000px] h-[70px] px-4 py-1 rounded-full border border-gray-200/80"
  >
    <form
      @submit.prevent="handleSubmit"
      class="flex flex-col md:flex-row items-center gap-4 md:gap-6"
    >
      <div class="w-full md:flex-1">
        <LocationInput
          id="start"
          label="Starting Point"
          v-model="form.start"
          placeholder="Paris, France"
          :disabled="loading"
        />
      </div>

      <div class="w-full md:flex-1">
        <LocationInput
          id="destination"
          label="Destination"
          v-model="form.destination"
          placeholder="Marakech, Morocco"
          :disabled="loading"
        />
      </div>

      <StopsInput
        v-model="form.nbStops"
        :disabled="loading"
        class="w-full md:w-auto"
      />
      <div class="-mr-3">
        <Button
          rounded
          type="submit"
          size="large"
          :loading="loading"
          :disabled="!isFormValid"
          icon="pi pi-search text-white"
        />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import type { SearchFormData } from "@/types";
import { useTripStore } from "~/stores/trip";

const emit = defineEmits(["submit"]);
const loading = ref(false);
const tripStore = useTripStore();

const form = ref<SearchFormData>({
  start: "",
  destination: "",
  nbStops: 3,
});

// Populate form with current trip data if available
watch(
  () => tripStore.currentTrip,
  (newTrip) => {
    if (newTrip) {
      form.value = {
        start: newTrip.start,
        destination: newTrip.destination,
        nbStops: newTrip.nbStops,
      };
    }
  },
  { immediate: true }
);

const isFormValid = computed(() => {
  return form.value.nbStops >= 1 && form.value.nbStops <= 10;
});

const handleSubmit = () => {
  if (!isFormValid.value) return;

  loading.value = true;
  emit("submit", { ...form.value });
  loading.value = false;
};
</script>
