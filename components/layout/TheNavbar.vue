<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-white  shadow-lg" role="navigation">
    <div class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center h-[100px]">
        <div class="flex-1">
          <NuxtLink to="/" class="flex mt-3 items-center" aria-label="Passe.ai - Home">
            <PasseIcon class="h-12 w-auto" />
            <span class="mt-[-12px] text-xl font-bold text-gray-900">Passe.ai</span>
          </NuxtLink>
        </div>

        <div class="hidden md:flex items-center gap-12 flex-1">
          <NuxtLink to="/" class="font-medium text-base text-gray-900 hover:text-gray-700"
            :class="{ 'text-primary hover:text-primary_dark': isActive('/') }">
            Home
          </NuxtLink>
          <NuxtLink to="/saved-trips" class="font-medium text-base text-gray-900 hover:text-gray-700"
            :class="{ 'text-primary hover:text-primary_dark': isActive('/saved-trips') }">
            Saved Trips
          </NuxtLink>
          <NuxtLink to="/about" class="font-medium text-base text-gray-900 hover:text-gray-700"
            :class="{ 'text-primary hover:text-primary_dark': isActive('/about') }">
            About
          </NuxtLink>
          <NuxtLink to="/contact" class="font-medium text-base text-gray-900 hover:text-gray-700"
            :class="{ 'text-primary hover:text-primary_dark': isActive('/contact') }">
            Contact
          </NuxtLink>
        </div>
        <div class="flex items-center gap-6 flex-1">
          <!-- LOGIN AND REGISTER BUTTONS -->
          <!-- <NuxtLink 
            to="/login"
            class="font-medium text-gray-900 hover:text-gray-700"
          >
            Login 
          </NuxtLink>
          <NuxtLink 
            to="/register"
            class="font-medium bg-primary text-white px-4 py-2 rounded-full hover:bg-gray-800"
          >
            Register
          </NuxtLink> -->
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">

const location = useRoute();

const isActive = (path: string) => {
  return location.path === path;
}

</script>