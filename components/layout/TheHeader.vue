<template>
  <header class="relative h-[50vh] flex items-center justify-center" role="banner">
    <div class="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105 transition-transform duration-1000"
      aria-hidden="true">
      <div class="absolute inset-0 bg-gradient-to-b from-black/50 to-black/50"></div>
      <img src="/public/img1.jpg" alt="mountain" class="w-full h-full object-cover">
    </div>

    <div class="relative flex flex-col z-10 w-full mx-auto px-4 sm:px-6 lg:px-8 text-center"  style="width: max-content;">
      <div class="mt-20">
        <h1 class="text-[80px] font-bold mb-4 sm:mb-6 text-white tracking-tight">
          Your Next Adventure Awaits
        </h1>
        <p class="text-base sm:text-lg md:text-xl mb-8 sm:mb-12 text-white/90 max-w-2xl mx-auto font-light">
          Plan your perfect road trip with our AI-powered itinerary builder. Discover hidden gems and create
          unforgettable memories.
        </p>
      </div>
      <slot></slot>
    </div>
  </header>
</template>