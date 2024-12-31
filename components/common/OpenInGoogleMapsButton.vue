<template>
  <Button
    text
    size="small"
    @click="openInGoogleMaps"
    label="Directions"
    aria-label="Open itinerary in Google Maps"
    icon="pi pi-directions-alt"
  />
</template>

<script setup lang="ts">
import type { Stop } from "@/types";

const props = defineProps<{
  stops: Stop[];
}>();
function generateGoogleMapsUrl(stops: Stop[]): string {
  if (!stops.length) return "";

  const baseUrl = "https://www.google.com/maps/dir/?api=1";
  const origin = `&origin=${encodeURIComponent(stops[0].address)}`;
  const destination = `&destination=${encodeURIComponent(
    stops[stops.length - 1].address
  )}`;

  let waypoints = "";
  if (stops.length > 2) {
    waypoints =
      "&waypoints=" +
      stops
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
