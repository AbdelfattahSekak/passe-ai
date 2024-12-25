<template>
  <div>
    <Button
      @click="openShareDialog"
      label="Share"
      class="p-button-text p-button-plain text-blue-600"
      aria-label="Share itinerary"
    >
      <template #icon>
        <i class="pi pi-share-alt mr-2"></i>
      </template>
    </Button>

    <Dialog v-model:visible="dialogVisible" modal>
      <template #header>
        <div class="inline-flex items-center gap-3 p-2">
          <h2 class="text-xl font-semibold m-0">Share {{ itemTitle }}</h2>
        </div>
      </template>

      <div class="flex flex-col gap-4 p-2 w-full">
        <div class="flex items-center gap-2">
          <i class="pi pi-share-alt text-xl text-primary"></i>
          <label class="">Share link with anyone</label>
        </div>
        <div class="w-full flex gap-2 p-3 surface-100">
          <InputText
            size="large"
            type="text"
            :value="shareUrl"
            disabled
            fluid
          />
          <Button
            @click="copyToClipboard"
            outlined
            :icon="copied ? 'pi pi-check' : 'pi pi-copy'"
            :label="copied ? 'Copied!' : 'Copy'"
          />
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = withDefaults(
  defineProps<{
    itemTitle: string;
    itemType?: string;
    shareUrl?: string;
  }>(),
  {
    itemType: "trip",
    shareUrl: document.location.href,
  }
);

const dialogVisible = ref(false);
const copied = ref(false);
const urlInput = ref<HTMLInputElement | null>(null);

function openShareDialog() {
  dialogVisible.value = true;
  copied.value = false;
}

async function copyToClipboard() {
  try {
    await navigator.clipboard.writeText(props.shareUrl);
    copied.value = true;

    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (err) {}
}
</script>

<style scoped></style>
