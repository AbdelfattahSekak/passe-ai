<template>
  <div class="flex gap-3">
    <Button
      icon="pi pi-arrow-left"
      class="bg-white"
      @click="$emit('back')"
      aria-label="Return to itinerary"
      raised
      rounded
    />
    
    <div class="flex-1 flex flex-col gap-6">
      <div>
        <h2 class="text-2xl font-bold mb-2">{{ stop.title }}</h2>
        <p class="text-sm text-text-secondary flex items-center gap-2 mb-4">
          <i class="pi pi-map-marker text-primary"></i>
          {{ stop.address }}
        </p>
        <StopPhoto :photos="stop.locationInfo?.photos || []" class="mb-6" />
        <h3 class="font-semibold mb-4">About</h3>
        <p>{{ stop.details }}</p>
      </div>

      <div>
        <h3 class="font-semibold mb-4">Activities</h3>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-4" role="list">
          <ActivityCard
            v-for="(activity, index) in stop.activities"
            :key="index"
            :activity="activity"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Stop } from "@/types";
import StopPhoto from "~/components/itinerary/StopPhoto.vue";

defineProps<{
  stop: Stop;
}>();

defineEmits<{
  back: [];
}>();
</script>
