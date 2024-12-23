<template>
  <div class="relative h-48 overflow-hidden rounded-t-lg">
    <img
      :src="getGooglePhotoUrl(photos[0], config.public.GOOGLE_MAPS_API_KEY)"
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
import type { PlacePhoto } from "~/types";
import getGooglePhotoUrl from "@/utils/getGooglePhotoUrl";

const config = useRuntimeConfig();

defineProps<{
  photos: PlacePhoto[];
}>();
</script>
