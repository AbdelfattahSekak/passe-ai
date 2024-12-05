<template>
  <div class="space-y-4">
    <template v-if="stops.length">
      <UCard
        v-for="(stop, index) in stops"
        :key="index"
        class="form-card overflow-hidden"
      >
        <div @click="toggleStop(index)" class="cursor-pointer">
          <div class="flex items-center space-x-4">
            <div
              class="flex-shrink-0 w-8 h-8 travel-gradient rounded-full flex items-center justify-center text-white font-bold"
            >
              {{ index + 1 }}
            </div>
            <div class="flex-grow">
              <h3 class="text-lg font-semibold">{{ stop.title }}</h3>
              <p class="text-sm text-gray-600 flex items-center">
                <UIcon name="i-ph-map-pin-line" class="w-4 h-4 mr-1" />
                {{ stop.location }}
              </p>
            </div>
            <UIcon
              :name="
                expandedStops[index]
                  ? 'i-ph-caret-up-bold'
                  : 'i-ph-caret-down-bold'
              "
              class="w-5 h-5 text-gray-400"
            />
          </div>
        </div>

        <UCollapse :model-value="expandedStops[index]">
          <div class="mt-4 space-y-4 pt-4 border-t">
            <p class="text-gray-600">{{ stop.details }}</p>

            <!-- <div v-if="stop.images.length" class="grid grid-cols-2 gap-4">
              <div v-for="(image, imageIndex) in stop.images" :key="imageIndex" class="relative group">
                <img 
                  :src="image.url" 
                  :alt="image.caption" 
                  class="rounded-lg w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105"
                >
                <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 rounded-b-lg">
                  <p class="text-xs text-white">{{ image.caption }}</p>
                </div>
              </div>
            </div> -->

            <div v-if="stop.activities.length">
              <h4 class="font-semibold mb-2 flex items-center">
                <UIcon
                  name="i-ph-list-checks"
                  class="w-5 h-5 mr-2 text-blue-500"
                />
                Activities
              </h4>
              <ul class="space-y-2">
                <li
                  v-for="(activity, activityIndex) in stop.activities"
                  :key="activityIndex"
                  class="flex items-center space-x-2 text-sm text-gray-700"
                >
                  <UIcon
                    name="i-ph-check-circle"
                    class="w-4 h-4 text-green-500"
                  />
                  <span>{{ activity.title }}</span>
                </li>
              </ul>
            </div>
          </div>
        </UCollapse>
      </UCard>
    </template>
    <UCard v-else class="form-card">
      <div class="text-center py-8">
        <UIcon
          name="i-ph-map-trifold-duotone"
          class="w-12 h-12 mx-auto text-gray-400 mb-2"
        />
        <p class="text-gray-600">
          Plan your journey to see your itinerary here
        </p>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Stop } from "~/types";

const props = defineProps<{
  stops: Stop[];
}>();

const expandedStops = ref<boolean[]>([]);

const toggleStop = (index: number) => {
  expandedStops.value[index] = !expandedStops.value[index];
};
</script>
