<template>
  <div class="p-4" role="region" aria-label="Trip Itinerary">
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-text-primary">{{ title }}</h1>
      <div class="mt-2">
        <OpenInGoogleMapsButton :stops="stops" />
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
      <template #content="slotProps">
        <div class="flex mb-10 flex-col gap-2">
          <div>
            <h2 class="text-xl font-bold">{{ slotProps.item.title }}</h2>
            <p class="text-sm text-text-secondary flex items-center gap-2 mt-1">
              <i class="pi pi-map-marker text-primary"></i>
              {{ slotProps.item.address }}
            </p>
          </div>
          <Card class="shadow-xl bg-gray-50">
            <template #header>
              <StopPhoto :photos="slotProps.item.locationInfo.photos" />
            </template>
            <template #content>
              <div class="p-2 flex flex-col gap-4">
                <p class="text-text-primary">{{ slotProps.item.details }}</p>

                <div class="mt-4">
                  <h3 class="font-semibold mb-4 flex items-center gap-2">
                    Activities
                  </h3>
                  <div
                    class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2"
                    role="list"
                  >
                    <ActivityCard
                      v-for="(activity, index) in slotProps.item.activities"
                      :key="index"
                      :activity="activity"
                    />
                  </div>
                </div>
              </div>
            </template>
          </Card>
        </div>
      </template>
    </Timeline>
  </div>
</template>

<script setup lang="ts">
import type { Stop } from "@/types";
import StopPhoto from "~/components/itinerary/StopPhoto.vue";
import OpenInGoogleMapsButton from "~/components/common/OpenInGoogleMapsButton.vue";

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
