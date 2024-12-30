<template>
  <header
    class="min-h-[35vh] flex flex-col items-center justify-center w-full relative"
    role="banner"
  >
    <div class="text-center max-w-3xl px-4 mx-auto">
      <h1
        class="text-5xl font-bold mb-6 bg-gradient-to-r from-primary-800 to-primary-400 bg-clip-text text-transparent"
      >
        Discover Your Perfect Travel Experience
      </h1>

      <p class="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        Explore unique destinations, find the best deals, and create
        unforgettable memories with our AI-powered travel companion.
      </p>
    </div>
    <div class="px-4">
      <slot></slot>
    </div>
  </header>
</template>
