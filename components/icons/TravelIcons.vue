<template>
  <div class="mt-20 shadow-lg shadow-black">
  <div class="grid grid-cols-1 sha sm:grid-cols-2 md:grid-cols-4 gap-8 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div v-for="(feature, index) in features" :key="index" class="text-center">
        <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
          <i :class="feature.icon" class="text-2xl text-primary"></i>
      </div>
        <h3 class="text-lg font-semibold text-white mb-2">{{ feature.title }}</h3>
        <p class="text-gray-600">{{ feature.description }}</p>
    </div></div>
  </div>
</template>

<script setup lang="ts">
const features = [
  {
    icon: 'pi pi-compass',
    title: 'Smart Route Planning',
    description: 'AI-powered routes optimized for your preferences and schedule'
  },
  {
    icon: 'pi pi-map',
    title: 'Hidden Gems',
    description: 'Discover unique locations off the beaten path'
  },
  {
    icon: 'pi pi-clock',
    title: 'Time Optimization',
    description: 'Efficient scheduling to make the most of your journey'
  },
  {
    icon: 'pi pi-heart',
    title: 'Personalized Experience',
    description: 'Tailored suggestions based on your interests'
  }
];
</script>