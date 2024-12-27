<template>
  <div class="flex gap-3 mb-50">
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

      <Tabs value="attractions">
        <TabList>
          <Tab value="attractions">
            <div class="flex items-center gap-2">
              <i class="pi pi-compass"></i>
              <span>Attractions</span>
              <Badge :value="getActivitiesByCategory('geos').length" /></div
          ></Tab>
          <Tab value="restaurants">
            <div class="flex items-center gap-2">
              <i class="pi pi-ticket"></i>
              <span>Restaurants</span>
              <Badge :value="getActivitiesByCategory('restaurants').length" />
            </div>
          </Tab>
          <Tab value="hotels">
            <div class="flex items-center gap-2">
              <i class="pi pi-home"></i>
              <span>Hotels</span>
              <Badge :value="getActivitiesByCategory('hotels').length" /></div
          ></Tab>
        </TabList>
        <TabPanel value="attractions">
          <div
            v-if="getActivitiesByCategory('geos').length"
            class="grid grid-cols-2 md:grid-cols-3 gap-4 p-4"
          >
            <ActivityCard
              v-for="activity in getActivitiesByCategory('geos')"
              :key="activity.id"
              :activity="activity"
            />
          </div>
          <EmptyState
            v-else
            icon="pi-compass"
            message="No attractions found nearby"
          />
        </TabPanel>

        <TabPanel value="restaurants">
          <div
            v-if="getActivitiesByCategory('restaurants').length"
            class="grid grid-cols-2 md:grid-cols-3 gap-4 p-4"
          >
            <ActivityCard
              v-for="activity in getActivitiesByCategory('restaurants')"
              :key="activity.id"
              :activity="activity"
            />
          </div>
          <EmptyState
            v-else
            icon="pi-ticket"
            message="No restaurants found nearby"
          />
        </TabPanel>

        <TabPanel value="hotels">
          <div
            v-if="getActivitiesByCategory('hotels').length"
            class="grid grid-cols-2 md:grid-cols-3 gap-4 p-4"
          >
            <ActivityCard
              v-for="activity in getActivitiesByCategory('hotels')"
              :key="activity.id"
              :activity="activity"
            />
          </div>
          <EmptyState v-else icon="pi-home" message="No hotels found nearby" />
        </TabPanel>
      </Tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Stop } from "@/types";
import StopPhoto from "~/components/itinerary/StopPhoto.vue";

const props = defineProps<{
  stop: Stop;
}>();

defineEmits<{
  back: [];
}>();

const getActivitiesByCategory = (category: string) => {
  return props.stop.activities.filter((e) => e.category === category);
};
</script>

<style scoped></style>
