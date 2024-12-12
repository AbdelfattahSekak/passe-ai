<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-white  shadow-lg" role="navigation">
    <div class="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-[100px]">
          <NuxtLink to="/" class="flex mt-3 items-center" aria-label="Passe.ai - Home">
            <PasseIcon class="h-12 w-auto" />
            <span class="mt-[-12px] text-xl font-bold text-gray-900">Passe.ai</span>
          </NuxtLink>

        <div class="hidden md:flex items-center gap-12">
          <NuxtLink 
            to="/saved-trips"
            class="font-medium text-base text-gray-900 hover:text-gray-700"
          >
            Saved Trips
          </NuxtLink>
          <NuxtLink 
            to="/about"
            class="font-medium text-base text-gray-900 hover:text-gray-700"
          >
            About
          </NuxtLink>
          <NuxtLink 
            to="/contact"
            class="font-medium text-base text-gray-900 hover:text-gray-700"
          >
            Contact
          </NuxtLink>
        </div>
        <div class="flex items-center gap-6">
           <NuxtLink 
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
          </NuxtLink>

        </div>
      </div>
    </div>
  </nav>
</template>