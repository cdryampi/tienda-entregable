<template>
  <div class="specifications container pl-5">
    <div
      class="flex flex-row flex-wrap gap-4 p-5 bg-secondary rounded-3xl justify-center items-center relative"
    >
      <svg class="icon-box" viewBox="0 0 234 74" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 20C0 8.95431 8.95431 0 20 0H214C225.046 0 234 8.9543 234 20V74H0V20Z" fill="currentColor"></path>
        <rect x="58" y="32" width="118" height="19" rx="9.5" class="fill-white"></rect>
        <circle cx="117.5" cy="32.5" r="11.5" class="fill-white"></circle>
      </svg>
      <div class="flex flex-col items-center text-white">
        <h3 class="block text-2xl font-bold text-center mb-4">Specifications</h3>
      </div>
      <div class="flex flex-wrap gap-4 justify-center items-center">
        <img
          v-for="(icon, index) in icons"
          :key="index"
          :src="icon"
          class="w-25 h-25 block bg-white rounded-full p-2"
          :alt="`spec-icon-${index}`"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  icons: {
    type: Array,
    default: () => [
      '/images/hood.svg',
      '/images/rose.svg',
      '/images/shrink.svg',
      '/images/textile.svg'
    ]
  }
})
</script>
