<template>
  <div>
    <Button
      @click="openShareDialog"
      aria-label="Share itinerary"
      size="small"
      severity="secondary"
      icon="pi pi-share-alt"
    />

    <Dialog
      :header="`Share ${itemType} with your friends and family`"
      v-model:visible="dialogVisible"
      modal
      :style="{ width: '550px' }"
    >
      <div class="flex flex-col items-center gap-6 p-4">
        <img
          src="@/assets/illustrations/share.svg"
          alt="Share illustration"
          class="w-48 h-48 object-contain"
        />

        <div class="w-full flex flex-col gap-4">
          <div class="w-full flex gap-2 p-4 surface-100 rounded-lg">
            <InputText
              ref="urlInput"
              size="large"
              type="text"
              :value="shareUrl"
              readonly
              class="flex-1 p-2"
            />
            <Button
              @click="copyToClipboard"
              severity="secondary"
              :class="[
                'transition-all duration-200',
                copied ? 'p-button-success' : 'p-button-primary',
              ]"
              :icon="copied ? 'pi pi-check' : 'pi pi-copy'"
              :label="copied ? 'Copied!' : 'Copy link'"
            />
          </div>
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
    shareUrl: window.location.href,
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

<style scoped>
.p-dialog {
  @apply rounded-xl overflow-hidden;
}

.p-inputtext {
  @apply border-none;
}
</style>
