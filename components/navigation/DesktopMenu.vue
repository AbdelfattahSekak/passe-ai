<template>
  <nav class="hidden md:flex items-center space-x-8">
    <NuxtLink
      v-for="item in navigationItems"
      :key="item.path"
      :to="item.path"
      class="flex items-center gap-2 py-2 text-gray-700 hover:text-primary transition-colors duration-200"
      :class="{ 'text-primary': isActive(item.path) }"
    >
      <span>{{ item.label }}</span>
    </NuxtLink>
  </nav>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { navigationItems } from "~/config/navigation";

const route = useRoute();
const isActive = (path: string) => route.path === path;
</script>
