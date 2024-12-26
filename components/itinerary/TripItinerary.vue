<template>
  <div class="p-4" role="region" aria-label="Trip Itinerary">
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-text-primary">{{ title }}</h1>
      <div class="mt-2 flex items-center gap-4">
        <OpenInGoogleMapsButton :stops="stops" />
        <client-only placeholder="loading...">
          <ShareButton :itemTitle="title" itemType="trip" />
        </client-only>
      </div>
    </div>
    <Timeline :value="stops" class="customized-timeline">
      <template #marker="slotProps">
        <div class="flex items-center gap-4">
          <span
            class="flex w-8 h-8 items-center justify-center bg-primary text-white rounded-full shadow-sm"
          >
            {{ slotProps.index + 1 }}
          </span>
        </div>
      </template>
      <template class="mt-100" #content="slotProps">
        <StopCard :stop="slotProps.item" />
      </template>
    </Timeline>
  </div>
</template>

<script setup lang="ts">
import type { Stop } from "@/types";
import OpenInGoogleMapsButton from "~/components/common/OpenInGoogleMapsButton.vue";
import ShareButton from "~/components/common/ShareButton.vue";
import StopCard from "~/components/itinerary/StopCard.vue";

defineProps<{
  stops: Stop[];
  title: string;
}>();
</script>

<style>
.p-timeline-event {
  .p-timeline-event-opposite {
    display: none;
  }
}

.customized-timeline .p-timeline-event-content {
  margin-left: 1rem;
}

.hover\:scale-102:hover {
  transform: scale(1.02);
}
.focus\:scale-102:focus {
  transform: scale(1.02);
}
</style>
