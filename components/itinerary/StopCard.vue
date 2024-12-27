<template>
  <div class="flex flex-col gap-2">
    <h2 class="text-xl font-bold">{{ stop.title }}</h2>
    <p class="text-sm text-text-secondary flex items-center gap-2">
      <i class="pi pi-map-marker text-primary"></i>
      {{ stop.address }}
    </p>
  </div>
  <Card class="shadow-xl mt-2 bg-gray-50">
    <template #header>
      <StopPhoto :photos="stop.locationInfo?.photos || []" />
    </template>
    <template #content>
      <div class="p-2 flex flex-col gap-4">
        <p class="text-text-primary">{{ stop.details }}</p>
        <Divider />
        <Button
          severity="secondary"
          label="View More Details"
          @click="$emit('showDetails', stop)"
        />
      </div>
    </template>
  </Card>
  <Divider />
</template>

<script setup lang="ts">
import type { Stop } from "@/types";
import StopPhoto from "~/components/itinerary/StopPhoto.vue";
import Divider from "primevue/divider";

defineProps<{
  stop: Stop;
}>();

defineEmits<{
  showDetails: [stop: Stop];
}>();
</script>
