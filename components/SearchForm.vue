<template>
  <div :class="['search-bar-container', { 'fixed-search-bar': isFixed }]">
    <Card class="p-6 shadow-lg border-0 bg-white backdrop-blur-lg bg-opacity-30" :class="{'fixed-bg ':isFixed}">
      <template #content>
        <form @submit.prevent="handleSubmit" class="space-y-6 flex gap-4">
          <div class="grid grid-cols-3 w-full items-end gap-6" :class="{'items-center':isFixed}">
            <LocationInput
              id="start"
              :label="isFixed ? '' : 'Starting Point'"
              v-model="form.start"
              placeholder="Where are you starting from?"
              :disabled="loading"
            />

            <LocationInput
              id="destination"
              :label="isFixed ? '' : 'Destination'"
              v-model="form.destination"
              placeholder="Where are you heading?"
              :disabled="loading"
            />

            <StopsInput v-model="form.nbStops" :disabled="loading" :label="isFixed ? '' : 'Number of Stops'"/>
          </div>

            <Button
            type="submit"
            :loading="loading"
            :disabled="!isFormValid"
            class="min-w-[48px] rounded-full text-white hover:bg-white/80 hover:text-gray-950"
            >
            <i class="pi pi-search"></i>
          </Button>
        </form>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import type { SearchFormData } from '@/types';

const emit = defineEmits(['submit']);
const loading = ref(false);
const isFixed = ref(false);

const form = ref<SearchFormData>({
  start: '',
  destination: '',
  nbStops: 3,
});

const isFormValid = computed(() => {
  return form.value.nbStops >= 1 && form.value.nbStops <= 10;
});

const handleSubmit = () => {
  if (!isFormValid.value) return;

  loading.value = true;
  emit('submit', { ...form.value });
};

const handleScroll = () => {
  const searchBar = document.querySelector('.search-bar-container');
  if (!searchBar) return;
  isFixed.value = window.scrollY > 241;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.search-bar-container {
  position: relative;
  margin-top: 20px;
  width: 100%;
  max-width: 1000px;
  margin: auto;
}

.fixed-search-bar {
  position: fixed;
  top: 90px;
  left: 0;
  right: 0;
  z-index: 50;
  height: 100px;
}

.fixed-bg {
  /* height: 100px; */
  background-color: rgba(128, 128, 128, 0.733);
}

</style>