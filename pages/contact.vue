<template>
  <div class="min-h-screen bg-gray-50">
    <TheNavbar />
    <div class="pt-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 class="text-4xl font-bold text-white mb-8">Contact Us</h1>

        <div class="grid md:grid-cols-2 gap-12">
          <div>
            <p class="text-lg text-gray-600 mb-8">
              Have questions about planning your next adventure? We're here to
              help! Fill out the form below and we'll get back to you as soon as
              possible.
            </p>

            <div class="space-y-6">
              <div
                v-for="(info, index) in contactInfo"
                :key="index"
                class="flex items-start gap-4"
              >
                <div class="flex-shrink-0">
                  <i :class="info.icon" class="text-xl text-primary"></i>
                </div>
                <div>
                  <h3 class="font-medium text-white">{{ info.title }}</h3>
                  <p class="text-gray-600">{{ info.details }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
const contactInfo = [
  {
    icon: "pi pi-envelope",
    title: "Email",
    details: "support@passe.ai",
  },
  {
    icon: "pi pi-phone",
    title: "Phone",
    details: "+1 (555) 123-4567",
  },
  {
    icon: "pi pi-map-marker",
    title: "Office",
    details: "123 Adventure Street, Travel City, TC 12345",
  },
];
</script>
