<template>
  <div class="absolute inset-0 top-[360px] z-50">
    <Card class="bg-white px-6 py-2" style="border-radius: 100px">
      <template #content>
        <form @submit.prevent="handleSubmit" class="space-y-6 flex gap-4">
          <div class="flex items-center gap-6">
            <LocationInput
              id="start"
              label="Starting Point"
              v-model="form.start"
              placeholder="Where are you starting from?"
              :disabled="loading"
            />

            <LocationInput
              id="destination"
              label="Destination"
              v-model="form.destination"
              placeholder="Where are you heading?"
              :disabled="loading"
            />

            <StopsInput
              v-model="form.nbStops"
              :disabled="loading"
              label="Number of Stops"
            />
            <div class="flex -mr-3">
              <Button
                type="submit"
                :loading="loading"
                :disabled="!isFormValid"
                class="bg-primary text-white w-[73px] h-[73px] rounded-full flex items-center justify-center"
              >
                <i class="pi pi-search text-white text-xl"></i>
              </Button>
            </div>
          </div>
        </form>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import type { SearchFormData } from "@/types";

const emit = defineEmits(["submit"]);
const loading = ref(false);
// const isFixed = ref(false);

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
};
</script>
