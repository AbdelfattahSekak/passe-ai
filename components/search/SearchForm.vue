<template>
  <div class="max-w-4xl mx-auto">
    <Card class="shadow-lg border-0">
      <template #content>
        <form @submit.prevent="handleSubmit" class="space-y-6" role="search">
          <div class="grid sm:grid-cols-2 md:grid-cols-4 gap-3 items-end">
            <LocationInput
              id="start"
              label="Starting Point"
              v-model="form.start"
              placeholder="Where are you starting from?"
              :disabled="loading"
              required
              aria-required="true"
            />
            
            <LocationInput
              id="destination"
              label="Destination"
              v-model="form.destination"
              placeholder="Where are you heading?"
              :disabled="loading"
              required
              aria-required="true"
            />
            
            <StopsInput
              v-model="form.stops"
              :disabled="loading"
              aria-label="Number of stops"
            />

            <Button
              type="submit"
              :loading="loading"
              :disabled="!isFormValid"
              class="h-[48px] w-full transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
              :class="{
                'bg-primary/90 cursor-not-allowed': !isFormValid,
                'bg-gradient-to-r from-primary to-secondary': isFormValid
              }"
              :aria-label="loading ? 'Planning your trip...' : 'Plan My Trip'"
            >
              <template #loading>
                <div class="flex items-center justify-center gap-2">
                  <i class="pi pi-spin pi-spinner text-lg" aria-hidden="true"></i>
                  <span class="font-medium">Creating Your Adventure...</span>
                </div>
              </template>
              <template #default>
                <div class="flex items-center justify-center gap-2">
                  <i class="pi pi-compass text-lg" aria-hidden="true"></i>
                  <span class="font-medium">Plan My Trip</span>
                </div>
              </template>
            </Button>
          </div>

          <!-- Form Validation Message -->
          <div 
            v-if="!isFormValid && (form.start || form.destination)" 
            class="text-sm text-primary/90 text-center mt-2"
            role="alert"
          >
            Please fill in both starting point and destination to plan your trip
          </div>
        </form>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import type { SearchFormData } from '~/types/search';

const emit = defineEmits(['submit']);
const loading = ref(false);

const form = ref<SearchFormData>({
  start: '',
  destination: '',
  stops: 3
});

const isFormValid = computed(() => {
  return form.value.start.length > 0 &&
         form.value.destination.length > 0 &&
         form.value.stops >= 1 && 
         form.value.stops <= 10;
});

const handleSubmit = () => {
  if (!isFormValid.value) return;
  
  loading.value = true;
  emit('submit', { ...form.value });
};
</script>

<style scoped>
:deep(.p-card) {
  @apply border-0;
}

:deep(.p-card-content) {
  @apply p-4 sm:p-6;
}

:deep(.p-button) {
  &:not(:disabled) {
    @apply transform transition-all duration-300;
    
    &:hover {
      @apply shadow-lg scale-[1.02];
    }
    
    &:active {
      @apply scale-[0.98];
    }
  }
  
  &:disabled {
    @apply opacity-70 cursor-not-allowed;
  }
}
</style>