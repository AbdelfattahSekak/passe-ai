```vue
<template>
  <section class="py-20 bg-primary">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 class="text-3xl font-bold text-white mb-6">
        Ready to Start Your Journey?
      </h2>
      <p class="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
        Let our AI help you create the perfect road trip itinerary tailored to your preferences
      </p>
      <Button 
        label="Plan Your Trip Now"
        icon="pi pi-arrow-right"
        class="p-button-lg"
        @click="$emit('startPlanning')"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
defineEmits(['startPlanning']);
</script>
```