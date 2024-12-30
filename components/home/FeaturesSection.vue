```vue
<template>
  <section class="py-16 bg-white" aria-labelledby="features-heading">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 id="features-heading" class="text-3xl font-bold text-center mb-12">
        Plan Smarter with AI
      </h2>
      
      <div class="grid md:grid-cols-3 gap-8">
        <div v-for="feature in features" :key="feature.title" class="text-center">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <i :class="['pi text-2xl text-primary', feature.icon]"></i>
          </div>
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
    icon: 'pi-compass',
    title: 'Smart Route Planning',
    description: 'Optimize your journey with AI-powered route suggestions'
  },
  {
    icon: 'pi-map',
    title: 'Hidden Gems',
    description: 'Discover unique locations off the beaten path'
  },
  {
    icon: 'pi-clock',
    title: 'Time Optimization',
    description: 'Make the most of your travel time with efficient scheduling'
  }
];
</script>
```