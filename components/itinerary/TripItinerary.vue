<template>
  <div class="p-4" role="region" aria-label="Trip Itinerary">
    <ItineraryHeader :title="title" :stops="stops" />
    <Divider />
    <Transition name="fade" mode="out-in">
      <div v-if="currentView === 'list'" key="list">
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
        key="details"
        :stop="selectedStop!"
        @back="returnToList"
      />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import type { Stop } from "@/types";
import StopCard from "~/components/itinerary/StopCard.vue";
import StopDetailsView from "~/components/itinerary/StopDetailsView.vue";
import ItineraryHeader from "./ItineraryHeader.vue";
import { useMapStore } from "~/stores/map";

const currentView = ref<"list" | "details">("list");
const selectedStop = ref<Stop | null>(null);

const mapStore = useMapStore();

const showStopDetails = (stop: Stop) => {
  selectedStop.value = stop;
  currentView.value = "details";
  mapStore.setFocusedStop(stop);
};

const returnToList = () => {
  currentView.value = "list";
  selectedStop.value = null;
  mapStore.resetMapView();
};

defineProps<{
  stops: Stop[];
  title: string;
}>();

defineEmits<{
  "focus-stop": [Stop];
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

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>
