<template>
    <div class="mb-6">
        <h1 class="text-2xl font-bold text-text-primary">{{ title }}</h1>
        <div class="mt-2 flex items-center gap-4">
          <OpenInGoogleMapsButton :stops="stops" />
          <client-only placeholder="loading...">
            <ShareButton :itemTitle="title" itemType="trip" />
          </client-only>
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