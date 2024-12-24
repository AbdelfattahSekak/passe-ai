<template>
  <Transition
    enter-active-class="transition-opacity duration-300"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-300"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="show" class="fixed inset-0 z-50 bg-white flex items-center justify-center">
      <div class="text-center">
        <div class="relative w-24 h-24 mb-4">
          <div class="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
          <div class="absolute inset-0 border-4 border-primary rounded-full animate-spin" style="border-top-color: transparent"></div>
        </div>
        <h2 class="text-2xl font-semibold text-gray-900 mb-2">{{ title }}</h2>
        <p class="text-gray-600">{{ message }}</p>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
defineProps<{
  show: boolean;
  title?: string;
  message?: string;
}>();
</script>