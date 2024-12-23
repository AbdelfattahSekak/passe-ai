<template>
  <div class="relative h-48 overflow-hidden rounded-t-lg">
    <img
      :if="photos[0]"
      :src="photos[0]?.url"
      loading="lazy"
      class="w-full h-full object-cover"
    />
    <div
      class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center"
    >
      <i class="pi pi-camera text-primary"></i>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LocationPhoto } from "~/types";

defineProps<{
  photos: LocationPhoto[];
}>();
</script>
