<template>
  <Button
    @click="openInGoogleMaps"
    icon="pi pi-external-link"
    :label="label"
    :class="buttonClass"
    :disabled="!stops.length"
    aria-label="Open itinerary in Google Maps"
  />
</template>

<script setup lang="ts">
import type { Stop } from "@/types";

const props = withDefaults(defineProps<{
  stops: Stop[];
  label?: string;
  buttonClass?: string;
}>(), {
  label: 'Open in Google Maps',
  buttonClass: 'p-button-secondary'
});

function generateGoogleMapsUrl(stops: Stop[]): string {
  if (!stops.length) return "";

  const baseUrl = "https://www.google.com/maps/dir/?api=1";
  const origin = `&origin=${encodeURIComponent(stops[0].address)}`;
  const destination = `&destination=${encodeURIComponent(
    stops[stops.length - 1].address
  )}`;

  let waypoints = "";
  if (stops.length > 2) {
    waypoints = "&waypoints=" + stops
      .slice(1, -1)
      .map((stop) => encodeURIComponent(stop.address))
      .join("|");
  }

  return `${baseUrl}${origin}${destination}${waypoints}&travelmode=driving`;
}

function openInGoogleMaps() {
  const url = generateGoogleMapsUrl(props.stops);
  if (url) {
    window.open(url, "_blank");
  }
}
</script>

<style scoped>
.p-button-secondary:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.p-button-secondary {
  transition: all 0.2s ease-in-out;
}
</style>
