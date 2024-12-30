<template>
  <div
    class="cursor-pointer mb-6"
    @mouseenter="handleHover(true)"
    @mouseleave="handleHover(false)"
    @click="$emit('showDetails', stop)"
  >
    <div class="flex flex-col gap-2">
      <h2 class="text-xl font-bold">{{ stop.title }}</h2>
      <p 
        class="text-sm text-text-secondary flex items-center gap-2 hover:text-primary cursor-pointer"
        @click.stop="openInGoogleMaps"
      >
        <i class="pi pi-map-marker text-primary"></i>
        {{ stop.address }}
      </p>
    </div>
    <Card class="mt-2">
      <template #header>
        <StopPhoto :photos="stop.locationInfo?.photos || []" />
      </template>
      <template #content>
        <div class="p-2 flex flex-col gap-4">
          <p class="text-text-primary">{{ stop.details }}</p>
          <Button text severity="secondary" label="View More Details" />
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import type { Stop } from "@/types";
import StopPhoto from "~/components/itinerary/StopPhoto.vue";
import Divider from "primevue/divider";
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
  window.open(url, '_blank');
}
</script>
