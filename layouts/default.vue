<template>
  <div class="min-h-screen">
    <slot />
    <TheFooter />
  </div>
  <Analytics />
  <SpeedInsights />
</template>
<script setup lang="ts">
import { Analytics } from "@vercel/analytics/nuxt";
import { SpeedInsights } from "@vercel/speed-insights/nuxt";
</script>
