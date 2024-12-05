<template>
  <section class="relative h-[80vh] flex items-center">
    <div class="absolute inset-0 z-0">
      <div class="absolute inset-0 bg-gradient-to-r from-blue-500/90 to-teal-400/90"></div>
      <img
        src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800"
        alt="Travel background"
        class="w-full h-full object-cover"
      />
    </div>
    
    <div class="container mx-auto px-4 relative z-10">
      <div class="max-w-3xl">
        <h1 class="text-5xl md:text-6xl font-bold text-white mb-6">
          Your Journey Begins Here
        </h1>
        <p class="text-xl text-white/90 mb-8">
          Plan your perfect adventure with our intelligent travel companion. 
          Discover amazing destinations and create unforgettable memories.
        </p>
        <UButton
          size="xl"
          color="white"
          variant="solid"
          @click="scrollToPlanner"
          class="font-semibold"
        >
          Start Planning
          <template #trailing>
            <UIcon name="i-ph-paper-plane-right-duotone" />
          </template>
        </UButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const scrollToPlanner = () => {
  document.getElementById('trip-planner')?.scrollIntoView({ behavior: 'smooth' });
};
</script>