<template>
  <nav class="fixed top-0 left-0 right-0 bg-white shadow-sm z-50" role="navigation">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
      <div class="flex justify-between items-center h-20">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <NuxtLink to="/" class="flex flex-col items-center" aria-label="Passe.ai - Home">
            <PasseIcon class="h-12 w-auto text-secondary" />
            <span class="mt-[-12px] text-xl font-bold text-gray-900">Passe.ai</span>
          </NuxtLink>
        </div>

        <!-- Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <NuxtLink 
            to="/saved-trips"
            class="text-gray-600 hover:text-primary transition-colors"
          >
            Saved Trips
          </NuxtLink>
          <NuxtLink 
            to="/about"
            class="text-gray-600 hover:text-primary transition-colors"
          >
            About
          </NuxtLink>
          <NuxtLink 
            to="/contact"
            class="text-gray-600 hover:text-primary transition-colors"
          >
            Contact
          </NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>