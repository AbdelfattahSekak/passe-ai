<template>
  <button role="listitem" class="w-full text-left" @click="handleClick">
    <Card
      class="h-full hover:shadow-lg transition-all duration-300 border border-gray-100"
    >
      <template #header>
        <div class="relative h-40 overflow-hidden rounded-t-lg">
          <img
            v-if="activity.locationInfo.photos?.[0]"
            :src="activity.locationInfo.photos[0].url"
            :alt="activity.title"
            loading="lazy"
            class="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
          />
          <div
            v-else
            class="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center"
          >
            <i class="pi pi-image text-gray-400 text-3xl"></i>
          </div>

          <div class="absolute top-3 right-3">
            <span
              class="px-3 py-1 rounded-full text-xs font-medium"
              :class="getCategoryClass(activity.category)"
            >
              {{ formatCategory(activity.category) }}
            </span>
          </div>

          <div
            class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3"
          >
            <div class="flex items-center gap-2">
              <div
                v-if="activity.locationInfo.details?.rating"
                class="flex items-center gap-1 px-2 py-1 bg-white/90 rounded-full"
              >
                <i class="pi pi-star-fill text-yellow-500 text-xs"></i>
                <span class="text-gray-800 text-xs font-semibold">
                  {{ activity.locationInfo.details?.rating }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template #content>
        <div class="p-4 space-y-2">
          <h4 class="font-semibold text-gray-800 line-clamp-2 leading-snug">
            {{ activity.title }}
          </h4>
          <div class="flex items-center gap-4 text-sm">
            <div
              v-if="activity.locationInfo.details?.price_level"
              class="flex items-center gap-1"
            >
              <span class="text-emerald-600 font-medium">
                {{ activity.locationInfo.details.price_level }}
              </span>
            </div>
            <div
              v-if="activity.locationInfo.details?.num_reviews"
              class="flex items-center gap-1 text-gray-500"
            >
              <i class="pi pi-comments text-xs"></i>
              <span>{{
                formatReviewCount(activity.locationInfo.details.num_reviews)
              }}</span>
            </div>
          </div>
        </div>
      </template>
    </Card>

    <!-- <ActivityModal
      v-if="activity.locationInfo.photos"
      v-model="showModal"
      :activity="activity"
    /> -->
  </button>
</template>

<script setup lang="ts">
import type { Activity } from "~/types";

const { activity } = defineProps<{
  activity: Activity;
}>();

const showModal = ref(false);

const formatCategory = (category: string) => {
  const map: Record<string, string> = {
    geos: "Attraction",
    restaurants: "Restaurant",
    hotels: "Hotel",
    attractions: "Attraction",
  };
  return map[category] || category;
};

const getCategoryClass = (category: string) => {
  const baseClasses = "bg-opacity-90 backdrop-blur-sm";
  const map: Record<string, string> = {
    geos: `${baseClasses} bg-blue-500 text-white`,
    restaurants: `${baseClasses} bg-amber-500 text-white`,
    hotels: `${baseClasses} bg-emerald-500 text-white`,
    attractions: `${baseClasses} bg-purple-500 text-white`,
  };
  return map[category] || `${baseClasses} bg-gray-500 text-white`;
};

const formatReviewCount = (count: string) => {
  const num = parseInt(count, 10);
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}k reviews`;
  }
  return `${num} reviews`;
};

const handleClick = (event: MouseEvent) => {
  // If ctrl/cmd key is pressed or middle mouse button, let the browser handle it

  event.preventDefault();
  if (activity.locationInfo.details?.web_url) {
    window.open(activity.locationInfo.details.web_url, "_blank");
  }

  //   // Regular click shows the modal
  //   showModal.value = true;
};
</script>

<style scoped>
.card {
  background: white;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-2px);
}
</style>
