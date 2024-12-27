<template>
  <button role="listitem" @click="showModal = true">
    <Card class="h-full border-none hover:shadow-lg transition-shadow">
      <template #header>
        <div class="relative h-32 overflow-hidden">
          <img
            v-if="activity.locationInfo.photos?.[0]"
            :src="activity.locationInfo.photos[0].url"
            :alt="activity.title"
            loading="lazy"
            class="w-full h-full object-cover"
          />
          <div
            v-else
            class="w-full h-full bg-gray-200 flex items-center justify-center"
          >
            <i class="pi pi-image text-gray-400 text-2xl"></i>
          </div>
          <div
            v-if="activity.locationInfo.details?.rating"
            class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2"
          >
            <div class="flex items-center gap-1">
              <i class="pi pi-star-fill text-yellow-400 text-xs"></i>
              <span class="text-white text-xs font-medium">
                {{ activity.locationInfo.details?.rating || "N/A" }}
              </span>
            </div>
          </div>
        </div>
      </template>
      <template #content>
        <div class="p-3 flex flex-col gap-2">
          <h4 class="font-medium text-sm text-text-primary line-clamp-2">
            {{ activity.title }}
          </h4>
          <p class="text-xs text-gray-500 line-clamp-2">
            {{ activity.address }}
          </p>
          <div class="flex items-center gap-2 mt-1">
            <Tag
              :severity="getCategoryStyle(activity.category)"
              :value="formatCategory(activity.category)"
              rounded
            />
          </div>
        </div>
      </template>
    </Card>

    <ActivityModal
      v-if="activity.locationInfo.photos"
      v-model="showModal"
      :activity="activity"
    />
  </button>
</template>

<script setup lang="ts">
import type { Activity } from "~/types";

defineProps<{
  activity: Activity;
}>();

const showModal = ref(false);

const formatCategory = (category: string) => {
  const map: Record<string, string> = {
    geos: "Attraction",
    restaurants: "Restaurant",
    hotels: "Hotel",
  };
  return map[category] || category;
};

const getCategoryStyle = (category: string) => {
  const map: Record<string, string> = {
    geos: "info",
    restaurants: "warning",
    hotels: "success",
  };
  return map[category] || "info";
};
</script>

<style scoped></style>
