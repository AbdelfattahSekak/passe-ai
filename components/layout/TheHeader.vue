<template>
  <header class="relative h-[400px] flex items-center justify-center overflow-hidden" role="banner">
    <!-- Background Image with Parallax Effect -->
    <div 
      class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80')] bg-cover bg-center bg-no-repeat transform scale-105 transition-transform duration-1000"
      aria-hidden="true"
    ></div>
    
    <!-- Gradient Overlay -->
    <div 
      class="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"
      aria-hidden="true"
    ></div>
    
    <!-- Content -->
    <div class="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h1 class="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 text-white font-sans tracking-tight">
        Your Next Adventure Awaits
      </h1>
      <p class="text-base sm:text-lg md:text-xl mb-8 sm:mb-12 text-white/90 max-w-2xl mx-auto font-light">
        Plan your perfect road trip with our AI-powered itinerary builder. Discover hidden gems and create unforgettable memories.
      </p>
      <slot></slot>
    </div>
  </header>
</template>