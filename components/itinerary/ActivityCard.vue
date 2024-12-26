<template>
  <button
    role="listitem"
    class="block w-full max-w-[120px] text-left transition-transform hover:scale-102 focus:scale-102"
    @click="showModal = true"
  >
    <Card class="h-full">
      <template #header>
        <div class="relative h-14 overflow-hidden rounded">
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
            <i class="pi pi-image text-gray-400 text-xl"></i>
          </div>
        </div>
      </template>
      <template #content>
        <div class="p-1">
          <h4
            class="font-medium text-xs text-text-primary min-h-[2.5rem] overflow-hidden"
          >
            <span
              class="line-clamp-2 [-webkit-box-orient:vertical] [-webkit-line-clamp:2] [display:-webkit-box]"
            >
              {{ activity.title }}
            </span>
          </h4>
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
</script>

<style scoped>
.hover\:scale-102:hover {
  transform: scale(1.02);
}
.focus\:scale-102:focus {
  transform: scale(1.02);
}
</style>
