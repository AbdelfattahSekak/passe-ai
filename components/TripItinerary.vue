<template>
  <div class="p-4 flex flex-col gap-6" role="list" aria-label="Trip Itinerary">
    <div v-for="(stop, index) in stops" :key="index" role="listitem">
      <Card>
        <template #header>
          <div class="relative h-[700px] overflow-hidden rounded-lg transition-all hover:shadow-lg delay-150 hover:shadow-gray-300 hover:scale-[1.01] mb-2">
            <img
              v-if="stop.photos[0]"
              :src="stop.photos[0].getURI({ maxHeight: 1000 })"
              loading="lazy"
              class="w-full h-[700px] object-cover"
            />
            <div
              class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center"
            >
              <i class="pi pi-camera text-primary"></i>
            </div>
          </div>
        </template>
        <template #title>
          <div class="flex items-center gap-4 px-2 mt-3">
            <span
              class="w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full"
            >
              {{ index + 1 }}
            </span>
            <h2 class="text-xl">{{ stop.address }}</h2>
          </div>
        </template>
        <template #content>
          <div class="flex flex-col px-2">
            <!-- <p class="text-sm text-text-secondary flex items-center gap-2">
              <i class="pi pi-map-marker text-primary"></i>
              {{ stop.address }}
            </p> -->
            <p class="text-text-primary text-sm -mt-2 mb-4">{{ stop.details }}</p>

            <div class="mb-5">
              <h3 class="font-semibold flex items-center gap-2 text-primary mb-3">
                <i class="pi pi-list"></i>
                Activities
              </h3>
              <ul class="flex flex-col gap-4" role="list">
                <li
                  v-for="activity in stop.activities"
                  :key="activity.title"
                  role="listitem"
                  class="flex items-start gap-3"
                >
                  <i class="pi pi-star-fill text-primary text-sm mt-1"></i>
                  <div>
                    <strong class="block text-text-primary">{{
                      activity.title
                    }}</strong>
                    <p class="text-sm text-text-secondary">
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
  </div>
</template>

<script setup lang="ts">
import type { Stop } from "@/types";
defineProps<{
  stops: Stop[];
}>();
</script>
