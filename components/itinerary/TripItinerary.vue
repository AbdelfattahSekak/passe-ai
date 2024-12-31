<template>
  <div class="p-8 z-10" role="region" aria-label="Trip Itinerary">
    <ItineraryHeader :title="title" :stops="stops" />
    <div class="relative">
      <Transition name="slide">
        <div
          v-show="!tripStore.selectedStop"
          key="list"
          class="transition-wrapper"
        >
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
      </Transition>

      <Transition name="slide">
        <div
          v-if="tripStore.selectedStop"
          key="details"
          class="transition-wrapper"
        >
          <StopDetailsView
            :stop="tripStore.selectedStop!"
            @back="returnToList"
          />
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Stop } from "@/types";
import StopCard from "~/components/itinerary/StopCard.vue";
import StopDetailsView from "~/components/itinerary/StopDetailsView.vue";
import ItineraryHeader from "./ItineraryHeader.vue";

const tripStore = useTripStore();

const showStopDetails = async (stop: Stop) => {
  tripStore.fetchStopActivities(stop.id);
  tripStore.setSelectedStop(stop);
};

const returnToList = () => {
  tripStore.setSelectedStop(null);
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

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(50px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}

.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  transform: translateX(0);
}

/* Add these new styles */
.transition-wrapper {
  position: absolute;
  width: 100%;
  left: 0;
  right: 0;
  backface-visibility: hidden;
}

.transition-wrapper:not(.slide-leave-active) {
  position: relative;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(100px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}

.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>
