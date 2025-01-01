<template>
  <div>
    <!-- Image Gallery -->
    <div class="relative overflow-hidden rounded-t-lg">
      <div class="grid grid-cols-3 gap-1 h-[200px]">
        <!-- Main large photo -->
        <div class="col-span-2 relative h-[200px]">
          <img v-if="photos[0]" :src="photos[0].getURI({ maxWidth: 800, maxHeight: 800 })" @click="openModal(0)"
            loading="lazy" class="w-full h-full object-cover cursor-pointer" />
          <div v-else class="w-full h-full bg-gray-200 flex items-center justify-center">
            <i class="pi pi-image text-gray-400 text-xl"></i>
          </div>
        </div>
        <!-- Two smaller photos stacked with equal height -->
        <div class="grid grid-rows-2 gap-1 h-[200px]">
          <div class="relative">
            <img v-if="photos[1]" :src="photos[1].getURI({ maxWidth: 400, maxHeight: 400 })" @click="openModal(1)"
              loading="lazy" class="w-full h-full object-cover cursor-pointer" />
            <div v-else class="w-full h-full bg-gray-200 flex items-center justify-center">
              <i class="pi pi-image text-gray-400 text-xl"></i>
            </div>
          </div>
          <div class="relative">
            <img v-if="photos[2]" :src="photos[2].getURI({ maxWidth: 400, maxHeight: 400 })" @click="openModal(2)"
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
    <div v-if="isModalOpen" class="fixed inset-0 bg-black flex justify-center items-center z-50"
      :class="{ 'hidden -z-20': !isModalOpens }">
    >
      <div class="absolute top-12 left-12">
        <!-- Close Button -->
        <button class="text-white font-semibold flex gap-2 items-center" @click="closeModal">
          <i class="pi pi-times"></i>
          Close
        </button>
      </div>
      <i class="pi pi-download text-white absolute right-12 top-12 cursor-pointer" @click="downloadImage"></i>

      <div class="relative bg-white h-[550px] w-[780px]  overflow-hidden">
        <!-- Modal Image -->
        <img :src="modalIndex !== null ? photos[modalIndex].getURI({ maxWidth: 1200, maxHeight: 1200 }) : ''"
          alt="Modal Image" class="object-cover w-full h-full" />
      </div>
      <!-- Navigation Buttons -->
      <button @click="previousImage" :disabled="modalIndex === 0"
        class="absolute left-12 top-1/2 transform -translate-y-1/2 text-white border-gray-400 border-[2px] w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-400 hover:bg-opacity-30"
        :class="{ 'opacity-50 cursor-not-allowed': modalIndex === 0 }">
        <i class="pi pi-arrow-left"></i>
      </button>
      <button @click="nextImage" :disabled="modalIndex === photos.length - 1"
        class="absolute right-12 top-1/2 transform -translate-y-1/2 text-white border-gray-400 border-[2px] w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-400 hover:bg-opacity-30"
        :class="{ 'opacity-50 cursor-not-allowed': modalIndex === photos.length - 1 }">
        <i class="pi pi-arrow-right"></i>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
  photos: google.maps.places.Photo[];
  isModalOpens: boolean; 
}>();

const isModalOpen = ref(false)
isModalOpen.value = false;

const modalIndex = ref<number | null>(null);

function openModal(index: number) {
  modalIndex.value = index;
  isModalOpen.value = true;
}

function closeModal() {
  isModalOpen.value = false;
  modalIndex.value = null;
}

function previousImage() {
  if (modalIndex.value !== null && modalIndex.value > 0) {
    modalIndex.value--;
  }
}

function nextImage() {
  if (modalIndex.value !== null && modalIndex.value < props.photos.length - 1) {
    modalIndex.value++;
  }
}
watch(isModalOpen, (newVal) => {
  if (newVal) {
    document.body.classList.add('no-scroll');
  } else {
    document.body.classList.remove('no-scroll');
  }
});
function downloadImage() {
  if (modalIndex.value !== null) {
    const imageUrl = props.photos[modalIndex.value].getURI({ maxWidth: 1200, maxHeight: 1200 });
    
    // Fetch the image as a Blob
    fetch(imageUrl)
      .then(response => response.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `image_${modalIndex.value}.jpg`; // You can adjust the name as you like
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url); // Clean up the URL object
      })
      .catch(err => console.error('Error downloading image:', err));
  }
}

</script>

<style>
/* Global styles */
.no-scroll {
  overflow: hidden;
}
</style>