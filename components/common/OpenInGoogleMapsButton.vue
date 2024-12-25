<template>
  <Button
    @click="openInGoogleMaps"
    label="Get directions"
    class="p-button-plain text-blue-600"
    aria-label="Open itinerary in Google Maps"
  >
    <template #icon>
      <i class="pi pi-directions mr-2"></i>
    </template>
  </Button>
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

<style scoped>
.p-button-secondary:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.p-button-secondary {
  transition: all 0.2s ease-in-out;
}

.p-button-text:hover {
  background: transparent !important;
  color: #003580 !important;
}

.p-button-text {
  padding: 0;
  color: #0071c2 !important;
}

.pi-directions {
  color: #0071c2;
}

.pi-directions:hover {
  color: #003580;
}
</style>
