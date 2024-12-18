<template>
  <Card class="bg-white h-[80px] px-4 py-1 rounded-full">
    <template #content>
      <form
        @submit.prevent="handleSubmit"
        class="flex flex-col md:flex-row items-center gap-4 md:gap-6"
      >
        <div class="w-full md:flex-1">
          <LocationInput
            id="start"
            label="Starting Point"
            v-model="form.start"
            placeholder="Where are you starting from?"
            :disabled="loading"
          />
        </div>

        <div class="w-full md:flex-1">
          <LocationInput
            id="destination"
            label="Destination"
            v-model="form.destination"
            placeholder="Where are you heading?"
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
            type="submit"
            :loading="loading"
            :disabled="!isFormValid"
            class="bg-primary hover:bg-primary_dark text-white w-[73px] h-[73px] rounded-full flex items-center justify-center"
          >
            <i class="pi pi-search text-white text-xl"></i>
          </Button>
        </div>
      </form>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import type { SearchFormData } from "@/types";

const emit = defineEmits(["submit"]);
const loading = ref(false);

const form = ref<SearchFormData>({
  start: "",
  destination: "",
  nbStops: 3,
});

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
