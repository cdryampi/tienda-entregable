<template>
  <div class="specifications container pl-5">
    <h3 class="block text-2xl font-bold text-center mb-4">Specifications</h3>
    <div
      class="flex flex-row flex-wrap gap-4 p-5 bg-gray-100 rounded-3xl justify-center items-center"
    >
      <img
        v-for="(icon, index) in icons"
        :key="index"
        :src="icon"
        class="w-25 h-25 block bg-white rounded-full p-2"
        :alt="`spec-icon-${index}`"
      />
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
