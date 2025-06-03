<template>
  <div class="size-container mb-5">
    <p class="mb-2">Size:</p>
    <div class="flex flex-row gap-2" id="size-links-container">
      <a
        v-for="(size, index) in sizes"
        :key="index"
        href="javascript:void(0)"
        class="dance-link py-3 px-5 border-2 border-black rounded-sm font-bold"
      >
        {{ size }}
      </a>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  sizes: {
    type: Array,
    default: () => ['S', 'M', 'L', 'XL', 'XXL']
  }
})
</script>
