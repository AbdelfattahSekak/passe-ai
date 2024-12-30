<template>
  <div
    class="bg-white m-auto max-w-[1000px] h-auto md:h-[80px] px-6 py-4 md:py-2 rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-md transition-all duration-300"
  >
    <form
      @submit.prevent="handleSubmit"
      class="flex flex-col md:flex-row items-stretch md:items-center gap-6"
    >
      <div class="flex-1 min-w-[200px]">
        <LocationInput
          id="start"
          label="From"
          v-model="form.start"
          placeholder="e.g. Paris, France"
          :disabled="loading"
        />
      </div>

      <div class="hidden md:flex items-center">
        <i class="pi pi-arrow-right text-gray-400"></i>
      </div>

      <div class="flex-1 min-w-[200px]">
        <LocationInput
          id="destination"
          label="To"
          v-model="form.destination"
          placeholder="e.g. Marrakech, Morocco"
          :disabled="loading"
        />
      </div>

      <StopsInput
        v-model="form.nbStops"
        :disabled="loading"
        class="w-full min-w-[250px]"
      />

      <Button
        rounded
        type="submit"
        :loading="loading"
        :disabled="!isFormValid"
        class="min-w-[100px] md:w-auto px-6 transition-all duration-300"
      >
        <template #icon>
          <i class="pi pi-search text-white mr-2"></i>
        </template>
        <span class="text-white">Search</span>
      </Button>
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
