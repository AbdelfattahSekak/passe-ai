<template>
  <TheNavbar />

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="text-center mb-12">
      <h1
        class="text-5xl font-bold mb-6 bg-gradient-to-r from-primary-800 to-primary-400 bg-clip-text text-transparent"
      >
        Get in Touch
      </h1>
      <p class="text-lg text-gray-600 max-w-2xl mx-auto">
        Have questions about planning your next adventure? We're here to help
        make your road trip dreams come true.
      </p>
    </div>

    <div class="grid md:grid-cols-2 gap-12 items-start">
      <div>
        <div class="bg-white rounded-lg p-8 shadow-lg">
          <h2 class="text-2xl font-semibold mb-6">Send us a Message</h2>
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div class="space-y-4">
              <InputText
                v-model="form.name"
                placeholder="Your Name"
                class="w-full"
                :class="{ 'p-invalid': errors.name }"
              />
              <small v-if="errors.name" class="text-red-500">{{
                errors.name
              }}</small>

              <InputText
                v-model="form.email"
                type="email"
                placeholder="Your Email"
                class="w-full"
                :class="{ 'p-invalid': errors.email }"
              />
              <small v-if="errors.email" class="text-red-500">{{
                errors.email
              }}</small>

              <Textarea
                v-model="form.message"
                placeholder="Your Message"
                rows="5"
                class="w-full"
                :class="{ 'p-invalid': errors.message }"
              />
              <small v-if="errors.message" class="text-red-500">{{
                errors.message
              }}</small>
            </div>

            <Button
              type="submit"
              label="Send Message"
              class="w-full"
              :loading="loading"
            />
          </form>
        </div>
      </div>

      <div class="space-y-8">
        <div class="bg-white rounded-lg p-8 shadow-lg">
          <h2 class="text-2xl font-semibold mb-6">Contact Information</h2>
          <div class="space-y-6">
            <div
              v-for="(info, index) in contactInfo"
              :key="index"
              class="flex items-start gap-4"
            >
              <div class="flex-shrink-0 bg-primary/10 p-3 rounded-full">
                <i :class="[info.icon, 'text-xl text-primary']"></i>
              </div>
              <div>
                <h3 class="font-medium text-gray-900">{{ info.title }}</h3>
                <p class="text-gray-600">{{ info.details }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";

const loading = ref(false);
const form = reactive({
  name: "",
  email: "",
  message: "",
});

const errors = reactive({
  name: "",
  email: "",
  message: "",
});

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

const socials = [
  {
    name: "Twitter",
    icon: "pi pi-twitter",
    url: "https://twitter.com/passeai",
  },
  {
    name: "Facebook",
    icon: "pi pi-facebook",
    url: "https://facebook.com/passeai",
  },
  {
    name: "Instagram",
    icon: "pi pi-instagram",
    url: "https://instagram.com/passeai",
  },
  {
    name: "LinkedIn",
    icon: "pi pi-linkedin",
    url: "https://linkedin.com/company/passeai",
  },
];

const handleSubmit = async () => {
  // Reset errors
  Object.keys(errors).forEach((key) => (errors[key] = ""));

  // Validate
  let hasErrors = false;
  if (!form.name) {
    errors.name = "Name is required";
    hasErrors = true;
  }
  if (!form.email) {
    errors.email = "Email is required";
    hasErrors = true;
  }
  if (!form.message) {
    errors.message = "Message is required";
    hasErrors = true;
  }

  if (hasErrors) return;

  try {
    loading.value = true;
    // Add your form submission logic here
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API call
    // Reset form after successful submission
    form.name = "";
    form.email = "";
    form.message = "";
  } catch (error) {
    console.error("Error submitting form:", error);
  } finally {
    loading.value = false;
  }
};

useHead(
  generateMetaTags({
    title: "Contact Us - Passe.ai",
    description:
      "Get in touch with Passe.ai for any questions about our AI-powered road trip planning service.",
    path: "/contact",
  })
);
</script>
