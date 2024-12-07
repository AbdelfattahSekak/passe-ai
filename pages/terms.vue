<template>
  <div class="pt-16">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 class="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
      
      <div class="prose prose-lg max-w-none">
        <p class="text-gray-600 mb-8">
          Last updated: {{ new Date().toLocaleDateString() }}
        </p>

        <section class="mb-8">
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
          <p class="text-gray-600">
            By accessing and using Passe.ai, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
          </p>
        </section>

        <section class="mb-8">
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">2. Use License</h2>
          <ul class="list-disc pl-6 space-y-2 text-gray-600">
            <li>Permission is granted to temporarily access and use Passe.ai for personal, non-commercial use</li>
            <li>This license does not include permission to modify, distribute, or create derivative works</li>
            <li>You must not use the service for any unlawful purpose</li>
          </ul>
        </section>

        <section class="mb-8">
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">3. Service Description</h2>
          <p class="text-gray-600">
            Passe.ai provides AI-powered road trip planning services. While we strive for accuracy, we do not guarantee that the information provided is complete, current, or error-free.
          </p>
        </section>

        <section class="mb-8">
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">4. User Responsibilities</h2>
          <ul class="list-disc pl-6 space-y-2 text-gray-600">
            <li>Provide accurate information when using our services</li>
            <li>Maintain the security of your account credentials</li>
            <li>Comply with all applicable laws and regulations</li>
            <li>Use the service responsibly and respectfully</li>
          </ul>
        </section>

        <section class="mb-8">
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">5. Limitation of Liability</h2>
          <p class="text-gray-600">
            Passe.ai shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use our services.
          </p>
        </section>

        <section class="mb-8">
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">6. Contact Information</h2>
          <p class="text-gray-600">
            Questions about the Terms of Service should be sent to:
            <br>
            Email: legal@passe.ai
            <br>
            Address: 123 Adventure Street, Travel City, TC 12345
          </p>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { generateMetaTags } from '~/utils/seo';

useHead(generateMetaTags({
  title: 'Terms of Service',
  description: 'Read about the terms and conditions for using Passe.ai\'s road trip planning services.',
  path: '/terms'
}));
</script>