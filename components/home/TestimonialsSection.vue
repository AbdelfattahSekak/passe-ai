```vue
<template>
  <section class="py-16 bg-gray-50" aria-labelledby="testimonials-heading">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 id="testimonials-heading" class="text-3xl font-bold text-center mb-12">
        What Travelers Say
      </h2>
      
      <div class="grid md:grid-cols-3 gap-8">
        <div v-for="testimonial in testimonials" :key="testimonial.name" 
             class="bg-white p-6 rounded-lg shadow-sm">
          <div class="flex items-center gap-4 mb-4">
            <img :src="testimonial.avatar" :alt="testimonial.name" 
                 class="w-12 h-12 rounded-full object-cover" />
            <div>
              <h3 class="font-semibold">{{ testimonial.name }}</h3>
              <p class="text-sm text-gray-600">{{ testimonial.location }}</p>
            </div>
          </div>
          <p class="text-gray-600">{{ testimonial.content }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const testimonials = [
  {
    name: 'Sarah Johnson',
    location: 'California, USA',
    content: 'The AI recommendations were spot-on! Found amazing hidden spots I would have never discovered otherwise.',
    avatar: '/avatars/sarah.jpg'
  },
  {
    name: 'Mark Chen',
    location: 'Toronto, Canada',
    content: 'Planning our family road trip was so easy. The route optimization saved us hours of driving time.',
    avatar: '/avatars/mark.jpg'
  },
  {
    name: 'Emma Wilson',
    location: 'London, UK',
    content: 'Love how it suggests activities based on our interests. Made our trip truly personalized.',
    avatar: '/avatars/emma.jpg'
  }
];
</script>
```