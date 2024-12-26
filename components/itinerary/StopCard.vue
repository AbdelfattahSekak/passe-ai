<template>
  <div class="flex flex-col gap-2">
    <div></div>
    <h2 class="text-xl font-bold">{{ stop.title }}</h2>
    <p class="text-sm text-text-secondary flex items-center gap-2 mt-1">
      <i class="pi pi-map-marker text-primary"></i>
      {{ stop.address }}
    </p>
  </div>
  <Card class="shadow-xl bg-gray-50">
    <template #header>
      <StopPhoto :photos="stop.locationInfo.photos" />
    </template>
    <template #content>
      <div class="p-2 flex flex-col gap-4">
        <p class="text-text-primary">{{ stop.details }}</p>
        <Divider />
        <Button
          severity="secondary"
          label="View More Details"
          @click="showModal = true"
        />
      </div>
    </template>
  </Card>

  <Dialog
    v-model:visible="showModal"
    modal
    header="Stop Details"
    :style="{ width: '90vw', maxWidth: '768px' }"
  >
    <div class="flex flex-col gap-6">
      <div>
        <h3 class="font-semibold mb-4">About</h3>
        <p>{{ stop.details }}</p>
      </div>

      <div>
        <h3 class="font-semibold mb-4 flex items-center gap-2">Activities</h3>
        <div
          class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
          role="list"
        >
          <ActivityCard
            v-for="(activity, index) in stop.activities"
            :key="index"
            :activity="activity"
          />
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import type { Stop } from "@/types";
import StopPhoto from "~/components/itinerary/StopPhoto.vue";
import { ref } from "vue";
import Divider from "primevue/divider";

defineProps<{
  stop: Stop;
}>();

const showModal = ref(false);
</script>
