<template>
  <div class="p-4" role="region" aria-label="Trip Itinerary">
    <ItineraryHeader :title="title" :stops="stops" />
    <div v-if="currentView === 'list'">
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
        <template #content="slotProps">
          <StopCard @showDetails="showStopDetails" :stop="slotProps.item" />
        </template>
      </Timeline>
    </div>

    <StopDetailsView
      v-else-if="currentView === 'details'"
      :stop="selectedStop!"
      @back="returnToList"
    />
  </div>
</template>

<script setup lang="ts">
import type { Stop } from "@/types";
import StopCard from "~/components/itinerary/StopCard.vue";
import StopDetailsView from "~/components/itinerary/StopDetailsView.vue";
import ItineraryHeader from "./ItineraryHeader.vue";

const currentView = ref<"list" | "details">("list");
const selectedStop = ref<Stop | null>(null);

const showStopDetails = (stop: Stop) => {
  selectedStop.value = stop;
  currentView.value = "details";
};

const returnToList = () => {
  currentView.value = "list";
  selectedStop.value = null;
};

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
}

.hover\:scale-102:hover {
  transform: scale(1.02);
}
.focus\:scale-102:focus {
  transform: scale(1.02);
}
</style>
