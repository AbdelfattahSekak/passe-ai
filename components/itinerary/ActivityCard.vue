<template>
  <button
    role="listitem"
    class="block w-full text-left transition-transform hover:scale-102 focus:scale-102"
  >
    <Card class="h-full">
      <template #header>
        <div class="relative h-24 overflow-hidden rounded-t-lg">
          <img
            v-if="activity.locationInfo?.photos[0]"
            :src="activity.locationInfo.photos[0].url"
            :alt="activity.title"
            loading="lazy"
            class="w-full h-full object-cover"
          />
          <div
            v-else
            class="w-full h-full bg-gray-200 flex items-center justify-center"
          >
            <i class="pi pi-image text-gray-400 text-2xl"></i>
          </div>
        </div>
      </template>
      <template #content>
        <div class="p-2">
          <h4 class="font-medium text-base text-text-primary mb-1 line-clamp-1">
            {{ activity.title }}
          </h4>
          <p class="text-xs text-text-secondary line-clamp-2">
            {{ activity.details }}
          </p>
        </div>
      </template>
    </Card>
  </button>
</template>

<script setup lang="ts">
import type { Activity } from "~/types";

defineProps<{
  activity: Activity;
}>();
</script>

<style scoped>
.hover\:scale-102:hover {
  transform: scale(1.02);
}
.focus\:scale-102:focus {
  transform: scale(1.02);
}
</style>
