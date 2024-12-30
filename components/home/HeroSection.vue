```vue
<template>
  <section class="relative py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-3xl mx-auto">
        <h1 class="text-4xl md:text-5xl font-bold mb-6">
          Your AI Travel Assistant
        </h1>
        <p class="text-xl text-gray-300 mb-8">
          Plan your perfect road trip with personalized recommendations and smart route optimization
        </p>
        <SearchForm @submit="$emit('startPlanning')" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineEmits(['startPlanning']);
</script>
```