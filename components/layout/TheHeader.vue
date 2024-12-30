<template>
  <header
    class="min-h-[30vh] flex flex-col items-center justify-center bg-gradient-to-b from-slate-50/95 to-white/80 backdrop-blur-md w-full relative"
    role="banner"
  >
    <div class="text-center max-w-3xl px-4 mx-auto">
      <h1
        class="text-4xl md:text-3xl font-bold mb-4 text-gray-900 tracking-tight leading-tight"
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
    <div
      class="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent"
    ></div>
  </header>
</template>
