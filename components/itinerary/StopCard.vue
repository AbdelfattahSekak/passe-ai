<template>
  <div
    class="cursor-pointer mb-32 max-w-xl"
    @mouseenter="handleHover(true)"
    @mouseleave="handleHover(false)"
    @click="$emit('showDetails', stop)"
  >
    <div class="flex flex-col gap-2">
      <h2 class="text-xl font-bold">{{ stop.title }}</h2>
    </div>
    <Card class="border-none shadow-none mt-2">
      <template #header>
        <div class="relative h-[200px] overflow-hidden rounded-xl">
          <StopPhoto
            :photos="stop.locationInfo?.photos || []"
            class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      </template>

      <template #content>
        <div class="flex mt-2 flex-col gap-4">
          <p
            class="text-sm text-gray-400 flex items-center gap-2 hover:text-primary cursor-pointer"
            @click.stop="openInGoogleMaps"
          >
            <i class="pi pi-map-marker text-primary"></i>
            {{ stop.address }}
          </p>
          <div class="space-y-2">
            <p class="text-gray-600">{{ stop.details }}</p>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import type { Stop } from "@/types";
import StopPhoto from "~/components/itinerary/StopPhoto.vue";
import { useMapStore } from "~/stores/map";

const mapStore = useMapStore();

const props = defineProps<{
  stop: Stop;
}>();

defineEmits<{
  showDetails: [stop: Stop];
}>();

function handleHover(isHovered: boolean) {
  mapStore.setHoveredStop(isHovered ? props.stop.id : null);
}

function openInGoogleMaps() {
  const encodedAddress = encodeURIComponent(props.stop.address);
  const url = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
  window.open(url, "_blank");
}
</script>
