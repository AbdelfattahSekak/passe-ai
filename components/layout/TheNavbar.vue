<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 h-[60px] bg-slate-50"
    role="navigation"
  >
    <div class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-[60px]">
        <div class="w-1/3">
          <NuxtLink
            to="/"
            class="flex mt-3 items-center"
            aria-label="Passe.ai - Home"
          >
            <PasseIcon class="h-12 w-auto" />
            <span class="mt-[-12px] text-xl font-bold text-gray-900"
              >Passe.ai</span
            >
          </NuxtLink>
        </div>

        <div class="hidden md:flex items-center justify-center gap-12 w-1/3">
          <NuxtLink
            to="/"
            class="font-medium text-base text-gray-900 hover:text-gray-700"
            :class="{ 'text-primary hover:text-primary_dark': isActive('/') }"
          >
            Home
          </NuxtLink>
          <NuxtLink
            to="/about"
            class="font-medium text-base text-gray-900 hover:text-gray-700"
            :class="{
              'text-primary hover:text-primary_dark': isActive('/about'),
            }"
          >
            About
          </NuxtLink>
          <NuxtLink
            to="/contact"
            class="font-medium text-base text-gray-900 hover:text-gray-700"
            :class="{
              'text-primary hover:text-primary_dark': isActive('/contact'),
            }"
          >
            Contact
          </NuxtLink>
        </div>
        <div class="w-1/3"></div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const location = useRoute();

const isActive = (path: string) => {
  return location.path === path;
};
</script>
