<template>
  <section class="py-20 bg-gray-50">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-12">Why Plan With Us?</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="feature in features" :key="feature.title" class="form-card p-6">
          <UIcon :name="feature.icon" class="w-12 h-12 text-blue-500 mb-4" />
          <h3 class="text-xl font-semibold mb-2">{{ feature.title }}</h3>
          <p class="text-gray-600">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const features = [
  {
    icon: 'i-ph-map-trifold-duotone',
    title: 'Smart Itineraries',
    description: 'Our AI-powered planner creates personalized itineraries based on your preferences and travel style.'
  },
  {
    icon: 'i-ph-compass-duotone',
    title: 'Interactive Maps',
    description: 'Visualize your journey with interactive maps and discover hidden gems along the way.'
  },
  {
    icon: 'i-ph-calendar-check-duotone',
    title: 'Easy Planning',
    description: 'Simple and intuitive interface to plan your perfect trip in minutes, not hours.'
  }
];
</script>