<template>
  <Dialog
    v-model:visible="isVisible"
    modal
    :dismissableMask="true"
    :closeOnEscape="true"
    :pt="{
      root: { class: 'max-w-4xl mx-auto' },
      content: { class: 'p-0 overflow-hidden' },
    }"
  >
    <template #container="{ closeCallback }">
      <div class="bg-white">
        <!-- Close button -->
        <button
          @click="closeCallback"
          class="absolute right-4 top-4 z-10 bg-white/90 hover:bg-white w-10 h-10 flex items-center justify-center rounded-full shadow-lg transition-all duration-200 backdrop-blur-sm"
          aria-label="Close modal"
        >
          <i class="pi pi-times text-gray-800 text-lg"></i>
        </button>

        <!-- Photo Gallery -->
        <PhotoGallery
          :photos="activity.locationInfo.photos"
          :title="activity.title"
        />

        <!-- Activity Details -->
        <div class="p-6">
          <div class="mb-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-2">
              {{ activity.title }}
            </h2>
            <p class="text-gray-600">{{ activity.details }}</p>
          </div>

          <div class="grid md:grid-cols-2 gap-6">
            <!-- Location Details -->
            <div>
              <h3 class="font-semibold text-gray-900 mb-3">Location</h3>
              <p class="flex items-center gap-2 text-gray-600">
                <i class="pi pi-map-marker"></i>
                {{ activity.address }}
              </p>
            </div>

            <!-- Activity Info -->
            <div>
              <h3 class="font-semibold text-gray-900 mb-3">Activity Details</h3>
              <ul class="space-y-2">
                <li class="flex items-center gap-2 text-gray-600">
                  <i class="pi pi-clock"></i>
                  <span>Duration: 2-3 hours</span>
                </li>
                <li class="flex items-center gap-2 text-gray-600">
                  <i class="pi pi-chart-bar"></i>
                  <span>Difficulty: Moderate</span>
                </li>
                <li class="flex items-center gap-2 text-gray-600">
                  <i class="pi pi-users"></i>
                  <span>Group size: 2-8 people</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Requirements -->
          <div class="mt-6">
            <h3 class="font-semibold text-gray-900 mb-3">Requirements</h3>
            <ul class="list-disc list-inside space-y-2 text-gray-600">
              <li>Comfortable walking shoes</li>
              <li>Weather-appropriate clothing</li>
              <li>Camera (optional)</li>
            </ul>
          </div>

          <!-- Booking Section -->
          <div class="mt-8 flex items-center justify-between border-t pt-6">
            <div>
              <p class="text-sm text-gray-600">From</p>
              <p class="text-2xl font-bold text-primary">
                $49<span class="text-sm font-normal text-gray-600"
                  >/person</span
                >
              </p>
            </div>
            <Button
              label="Book Now"
              icon="pi pi-calendar"
              class="p-button-primary"
            />
          </div>
        </div>
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import type { Activity } from "~/types";

const props = defineProps<{
  activity: Activity;
  modelValue: boolean;
}>();

const emit = defineEmits(["update:modelValue"]);

const isVisible = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const close = () => {
  isVisible.value = false;
};

// Prevent background scrolling when modal is open
watch(isVisible, (value) => {
  if (value) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
});

onUnmounted(() => {
  document.body.style.overflow = "";
});
</script>
