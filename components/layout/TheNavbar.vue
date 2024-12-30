<template>
  <header
    class="bg-slate-50/95 backdrop-blur-md top-0 left-0 right-0 h-[60px] dark:bg-gray-900 z-50"
    role="banner"
  >
    <div class="mx-auto px-4 h-full flex items-center justify-between">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center gap-2">
        <PasseIcon class="h-8 w-auto" />
        <span class="text-xl font-bold">Passe.ai</span>
      </NuxtLink>

      <!-- Desktop Navigation -->
      <DesktopMenu />

      <!-- Mobile Navigation -->
      <MobileMenu />
    </div>
  </header>
</template>

<script setup lang="ts">
import DesktopMenu from "~/components/navigation/DesktopMenu.vue";
import MobileMenu from "~/components/navigation/MobileMenu.vue";
</script>
