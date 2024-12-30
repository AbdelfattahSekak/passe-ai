<template>
  <div
    class="fixed z-40 px-4 py-1 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm"
  >
    <div
      class="max-w-[1400px] mx-auto relative flex items-center justify-center"
    >
      <!-- Logo -->
      <NuxtLink
        to="/"
        class="absolute left-0 flex items-center gap-2 hover:opacity-75 transition-opacity"
      >
        <PasseIcon class="h-6 w-auto" />
        <span class="font-bold text-base text-gray-900">Passe.ai</span>
      </NuxtLink>

      <!-- Search Form -->
      <div class="w-full max-w-[770px]">
        <SearchForm @submit="handleSearch" />
      </div>

      <!-- Menu Dropdown -->
      <div class="absolute right-0">
        <HeaderDropdown />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { SearchFormData } from "~/types";

defineProps<{
  handleSearch: (formData: SearchFormData) => void;
}>();
</script>
