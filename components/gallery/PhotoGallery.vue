<template>
  <div class="relative">
    <div class="overflow-hidden">
      <div
        class="flex transition-transform duration-300 ease-in-out"
        :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
      >
        <div
          v-for="(photo, index) in photos"
          :key="photo.id"
          class="flex-shrink-0 w-full"
        >
          <img
            :src="photo.url"
            :alt="`Photo ${index + 1} of ${title}`"
            class="w-full h-[400px] object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </div>

    <!-- Navigation Arrows -->
    <button
      v-if="photos.length > 1"
      @click="prevPhoto"
      class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white w-10 h-10 flex items-center justify-center rounded-full shadow-lg transition-all duration-200 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white/90"
      :class="{ 'opacity-0 hover:opacity-100': !showControls }"
      :disabled="currentIndex === 0"
      aria-label="Previous photo"
    >
      <i class="pi pi-chevron-left text-gray-800 text-lg"></i>
    </button>

    <button
      v-if="photos.length > 1"
      @click="nextPhoto"
      class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white w-10 h-10 flex items-center justify-center rounded-full shadow-lg transition-all duration-200 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white/90"
      :class="{ 'opacity-0 hover:opacity-100': !showControls }"
      :disabled="currentIndex === photos.length - 1"
      aria-label="Next photo"
    >
      <i class="pi pi-chevron-right text-gray-800 text-lg"></i>
    </button>

    <!-- Photo Indicators -->
    <div
      v-if="photos.length > 1"
      class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2"
    >
      <button
        v-for="(_, index) in photos"
        :key="index"
        @click="currentIndex = index"
        class="w-2 h-2 rounded-full transition-all"
        :class="index === currentIndex ? 'bg-white scale-125' : 'bg-white/50'"
        :aria-label="`Go to photo ${index + 1}`"
      ></button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LocationPhoto } from "~/types";

const props = defineProps<{
  photos: LocationPhoto[];
  title: string;
}>();

const currentIndex = ref(0);
const showControls = ref(false);

const nextPhoto = () => {
  if (currentIndex.value < props.photos.length - 1) {
    currentIndex.value++;
  }
};

const prevPhoto = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
};

// Handle keyboard navigation
onMounted(() => {
  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") prevPhoto();
    if (e.key === "ArrowRight") nextPhoto();
  };

  window.addEventListener("keydown", handleKeydown);
  onUnmounted(() => window.removeEventListener("keydown", handleKeydown));

  // Show controls on hover
  const handleMouseMove = () => {
    showControls.value = true;
    setTimeout(() => {
      showControls.value = false;
    }, 2000);
  };

  window.addEventListener("mousemove", handleMouseMove);
  onUnmounted(() => window.removeEventListener("mousemove", handleMouseMove));
});
</script>
