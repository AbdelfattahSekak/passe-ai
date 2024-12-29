<template>
  <div class="mb-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-text-primary">{{ title }}</h1>
      <div class="flex items-center gap-3">
        <OpenInGoogleMapsButton :stops="stops" />
        <client-only placeholder="loading...">
          <ShareButton :itemTitle="title" itemType="trip" />
        </client-only>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Stop } from "@/types";
import OpenInGoogleMapsButton from "~/components/common/OpenInGoogleMapsButton.vue";
import ShareButton from "~/components/common/ShareButton.vue";

defineProps<{
  stops: Stop[];
  title: string;
}>();
</script>
