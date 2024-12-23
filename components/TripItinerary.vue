<template>
  <div class="p-4" role="region" aria-label="Trip Itinerary">
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-text-primary">{{ title }}</h1>
    </div>
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
                    class="grid grid-cols-2 sm:grid-cols-3 gap-3"
                    role="list"
                  >
                    <button
                      v-for="activity in slotProps.item.activities"
                      :key="activity.title"
                      role="listitem"
                      class="block w-full text-left transition-transform hover:scale-102 focus:scale-102"
                    >
                      <Card class="h-full">
                        <template #header>
                          <div
                            class="relative h-24 overflow-hidden rounded-t-lg"
                          >
                            <img
                              :src="activity.locationInfo.photos[0].url"
                              :alt="activity.title"
                              loading="lazy"
                              class="w-full h-full object-cover"
                            />
                          </div>
                        </template>
                        <template #content>
                          <div class="p-2">
                            <h4
                              class="font-medium text-base text-text-primary mb-1 line-clamp-1"
                            >
                              {{ activity.title }}
                            </h4>
                            <p class="text-xs text-text-secondary line-clamp-2">
                              {{ activity.details }}
                            </p>
                          </div>
                        </template>
                      </Card>
                    </button>
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
import StopPhoto from "@/components/StopPhoto.vue";
import getGooglePhotoUrl from "@/utils/getGooglePhotoUrl";
const config = useRuntimeConfig();

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
