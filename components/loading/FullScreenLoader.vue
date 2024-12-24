<template>
  <Transition
    enter-active-class="transition-opacity duration-300"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-300"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="show" class="fixed inset-0 z-50 bg-white flex items-center justify-center p-4">
      <div class="text-center max-w-xl">
        <!-- SVG Container with responsive sizing -->
        <div class="w-full max-w-md mx-auto mb-8 relative">
          <img 
            src="@/assets/illustrations/loader.svg"
            alt="Planning your trip"
            class="w-full h-auto"
          />
          <!-- Loading dots animation -->
          <div class="absolute bottom-0 left-1/2 -translate-x-1/2 flex space-x-2">
            <div class="w-3 h-3 bg-primary rounded-full animate-bounce" style="animation-delay: 0s"></div>
            <div class="w-3 h-3 bg-primary rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
            <div class="w-3 h-3 bg-primary rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
          </div>
        </div>
        
        <h2 class="text-3xl font-bold text-gray-900 mb-3">{{ title }}</h2>
        <p class="text-lg text-gray-600 max-w-sm mx-auto">
          {{ message }}
          <span v-if="!message" class="block text-sm mt-2 text-gray-500">
            Our AI is crafting your perfect travel itinerary...
          </span>
        </p>
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

<style scoped>
.animate-bounce {
  animation: bounce 1s infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
</style>