<template>
  <div class="relative overflow-hidden rounded-t-lg">
    <div class="grid grid-cols-3 gap-1 h-[250px]">
      <!-- Main large photo -->
      <div class="col-span-2 relative h-[250px]">
        <img
          v-if="photos[0]"
          :src="photos[0].url"
          loading="lazy"
          class="w-full h-full object-cover"
        />
        <div
          v-else
          class="w-full h-full bg-gray-200 flex items-center justify-center"
        >
          <i class="pi pi-image text-gray-400 text-xl"></i>
        </div>
      </div>
      <!-- Two smaller photos stacked with equal height -->
      <div class="grid grid-rows-2 gap-1 h-[250px]">
        <div class="relative">
          <img
            v-if="photos[1]"
            :src="photos[1].url"
            loading="lazy"
            class="w-full h-full object-cover"
          />
          <div
            v-else
            class="w-full h-full bg-gray-200 flex items-center justify-center"
          >
            <i class="pi pi-image text-gray-400 text-xl"></i>
          </div>
        </div>
        <div class="relative">
          <img
            v-if="photos[2]"
            :src="photos[2].url"
            loading="lazy"
            class="w-full h-full object-cover"
          />
          <div
            v-else
            class="w-full h-full bg-gray-200 flex items-center justify-center"
          >
            <i class="pi pi-image text-gray-400 text-xl"></i>
          </div>
        </div>
      </div>
    </div>
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
