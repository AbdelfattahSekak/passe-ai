<template>
  <div class="p-4" role="region" aria-label="Trip Itinerary">
    <Timeline :value="stops" class="customized-timeline">
      <template #marker="slotProps">
        <div class="flex items-center gap-4">
          <span
            class="flex w-8 h-8 items-center justify-center bg-primary text-white rounded-full z-10 shadow-sm"
          >
            {{ slotProps.index + 1 }}
          </span>
        </div>
      </template>
      <template #content="slotProps">
        <div class="flex mb-10 flex-col gap-2">
          <div>
            <h2 class="text-xl font-medium">{{ slotProps.item.title }}</h2>
            <p class="text-sm text-text-secondary flex items-center gap-2 mt-1">
              <i class="pi pi-map-marker text-primary"></i>
              {{ slotProps.item.address }}
            </p>
          </div>
          <Card>
            <template #header>
              <div class="relative h-48 overflow-hidden rounded-t-lg">
                <img
                  v-if="slotProps.item.photos[0]"
                  :src="slotProps.item.photos[0].getURI({ maxHeight: 1000 })"
                  loading="lazy"
                  class="w-full h-full object-cover"
                />
                <div
                  class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center"
                >
                  <i class="pi pi-camera text-primary"></i>
                </div>
              </div>
            </template>
            <template #content>
              <div class="p-2 flex flex-col gap-4">
                <p class="text-text-primary">{{ slotProps.item.details }}</p>

                <div class="mt-4">
                  <h3 class="font-semibold mb-2 flex items-center gap-2">
                    <i class="pi pi-list text-primary"></i>
                    Activities
                  </h3>
                  <ul class="space-y-4" role="list">
                    <li
                      v-for="activity in slotProps.item.activities"
                      :key="activity.title"
                      role="listitem"
                      class="flex items-start gap-3"
                    >
                      <i class="pi pi-star-fill text-primary mt-1"></i>
                      <div>
                        <strong class="block text-text-primary">{{
                          activity.title
                        }}</strong>
                        <p class="text-sm text-text-secondary mt-1">
                          {{ activity.details }}
                        </p>
                      </div>
                    </li>
                  </ul>
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
defineProps<{
  stops: Stop[];
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
</style>
