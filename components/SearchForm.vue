<template>
  <div class="max-w-4xl mx-auto">
    <Card class="shadow-lg border-0">
      <template #content>
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="grid md:grid-cols-4 gap-3 items-end">
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
              v-model="form.stops"
              :disabled="loading"
            />

            <Button
              type="submit"
              :loading="loading"
              :disabled="!isFormValid"
              class="h-[48px] w-full"
            >
              <template #loading>
                <i class="pi pi-spin pi-spinner mr-2"></i>
                Planning...
              </template>
              <template #default>
                <i class="pi pi-search mr-2"></i>
                Plan My Trip
              </template>
            </Button>
          </div>
        </form>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import type { SearchFormData } from '~/types/search'

const emit = defineEmits(['submit'])
const loading = ref(false)

const form = ref<SearchFormData>({
  start: '',
  destination: '',
  stops: 3
})

const isFormValid = computed(() => {
  return form.value.stops >= 1 && 
         form.value.stops <= 10
})

const handleSubmit = () => {
  if (!isFormValid.value) return
  
  loading.value = true
  emit('submit', { ...form.value })
}
</script>

<style scoped>
:deep(.p-card) {
  @apply border-0;
}

:deep(.p-card-content) {
  @apply p-6;
}
</style>