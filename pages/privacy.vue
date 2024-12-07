<template>
  <div class="pt-16">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 class="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
      
      <div class="prose prose-lg max-w-none">
        <p class="text-gray-600 mb-8">
          Last updated: {{ new Date().toLocaleDateString() }}
        </p>

        <section class="mb-8">
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">Introduction</h2>
          <p class="text-gray-600">
            At Passe.ai, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our road trip planning services.
          </p>
        </section>

        <section class="mb-8">
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">Information We Collect</h2>
          <ul class="list-disc pl-6 space-y-2 text-gray-600">
            <li>Personal information (such as name and email address) when you create an account</li>
            <li>Travel preferences and trip planning details</li>
            <li>Location data when using our mapping features</li>
            <li>Usage information and interaction with our website</li>
          </ul>
        </section>

        <section class="mb-8">
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">How We Use Your Information</h2>
          <ul class="list-disc pl-6 space-y-2 text-gray-600">
            <li>To provide and improve our road trip planning services</li>
            <li>To personalize your experience and offer relevant suggestions</li>
            <li>To communicate with you about your trips and our services</li>
            <li>To ensure the security and functionality of our platform</li>
          </ul>
        </section>

        <section class="mb-8">
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">Data Security</h2>
          <p class="text-gray-600">
            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
          </p>
        </section>

        <section class="mb-8">
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
          <p class="text-gray-600">
            If you have questions about this Privacy Policy, please contact us at:
            <br>
            Email: privacy@passe.ai
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
  title: 'Privacy Policy',
  description: 'Learn about how Passe.ai collects, uses, and protects your personal information.',
  path: '/privacy'
}));
</script>