<template>
  <div class="card flex justify-center">
    <Galleria      
      v-model:visible="internalVisible"
      :value="images"
      :responsiveOptions="responsiveOptions" 
      :numVisible="9" 
      container-class="md:w-[80%] md:w-[70%] max-h-[80%] galleria"
      :circular="true" 
      :fullScreen="true" 
      :showItemNavigators="true" 
      :showThumbnails="false"
    >
      <template #item="slotProps">
        <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt" class="w-full h-full block object-cover" />
      </template>
      <template #thumbnail="slotProps">
        <img :src="slotProps.item.thumbnailImageSrc" :alt="slotProps.item.alt" class="block" />
      </template>
    </Galleria>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, onMounted, watch } from "vue";

const props = defineProps<{
  visible: boolean;
  photos: any;
}>();

// Internal visibility state
const internalVisible = ref(false);

// Flag to prevent the prop syncing back when internal state is updated
let isInternalChange = false;

// Images transformed for Galleria component
const images = ref<Array<{ itemImageSrc: string; thumbnailImageSrc: string; alt: string; title: string }>>([]);

// Responsive breakpoints for Galleria
const responsiveOptions = ref([
  { breakpoint: '1500px', numVisible: 5 },
  { breakpoint: '1024px', numVisible: 3 },
  { breakpoint: '768px', numVisible: 2 },
  { breakpoint: '560px', numVisible: 1 }
]);

// Function to transform photos into the desired format
const transformPhotos = (photos: Array<{ getURI: () => string; alt?: string; title?: string }>) => {
  return photos.map(photo => ({
    itemImageSrc: photo.getURI(),
    thumbnailImageSrc: "", // Empty for now, can be populated later
    alt: photo.alt || 'No description',
    title: photo.title || 'No title'
  }));
};

// Transform photos when the component is mounted
onMounted(() => {
  images.value = transformPhotos(props.photos);
});

// Emit event to parent on visibility changes
const emit = defineEmits(["update:visible"]);

// Watch for changes to prop "visible" and update internal visibility
watch(() => props.visible, (newVisible) => {
  if (!isInternalChange) {
    // If internal change flag is not set, sync with prop
    internalVisible.value = newVisible;
  }
});

// Watch internal visibility changes and emit to parent
watch(internalVisible, (newVisible) => {
  isInternalChange = true;  // Flag that change is internal
  emit("update:visible", newVisible);
  isInternalChange = false;  // Reset the flag after emitting
});
</script>
