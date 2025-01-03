<template>
  <div>
    <!-- Image Gallery -->
    <div class="relative overflow-hidden rounded-t-lg" @click="displayBasic = true">
      <div class="grid grid-cols-3 gap-1 h-[200px]">
        <!-- Main large photo -->
        <div class="col-span-2 relative h-[200px]">
          <img v-if="photos[0]" :src="photos[0].getURI({ maxWidth: 800, maxHeight: 800 })"
            loading="lazy" class="w-full h-full object-cover cursor-pointer" />
          <div v-else class="w-full h-full bg-gray-200 flex items-center justify-center">
            <i class="pi pi-image text-gray-400 text-xl"></i>
          </div>
        </div>
        <!-- Two smaller photos stacked with equal height -->
        <div class="grid grid-rows-2 gap-1 h-[200px]">
          <div class="relative">
            <img v-if="photos[1]" :src="photos[1].getURI({ maxWidth: 400, maxHeight: 400 })"
              loading="lazy" class="w-full h-full object-cover cursor-pointer" />
            <div v-else class="w-full h-full bg-gray-200 flex items-center justify-center">
              <i class="pi pi-image text-gray-400 text-xl"></i>
            </div>
          </div>
          <div class="relative">
            <img v-if="photos[2]" :src="photos[2].getURI({ maxWidth: 400, maxHeight: 400 })"
              loading="lazy" class="w-full h-full object-cover cursor-pointer" />
            <div v-else class="w-full h-full bg-gray-200 flex items-center justify-center">
              <i class="pi pi-image text-gray-400 text-xl"></i>
            </div>
          </div>
        </div>
      </div>
      <div
        class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center">
        <i class="pi pi-camera text-primary"></i>
      </div>
    </div>

    <!-- Modal -->
    <GalleryComponent :photos="photos" :visible="displayBasic" @update:visible="displayBasic = $event"/>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import GalleryComponent from '@/components/GalleryComponent.vue';

const props = defineProps<{
  photos: google.maps.places.Photo[];
  isModalOpens: boolean; 
}>();

const displayBasic = ref(false);

// const isModalOpen = ref(false)

// isModalOpen.value = false;
// const modalIndex = ref<number | null>(null);

// function openModal(index: number) {
//   modalIndex.value = index;
//   isModalOpen.value = true;

// }

// function closeModal() {
//   isModalOpen.value = false;
//   modalIndex.value = null;
// }

</script>

<style>
.no-scroll {
  overflow: hidden;
}
</style>