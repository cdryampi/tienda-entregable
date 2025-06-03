<template>
  <div class="flex flex-col gap-2 mb-5">
    <p
      class="p-3 rounded-full flex flex-row items-center"
      :class="stockClass"
    >
      <span class="bg-green-900 green-circle relative">
        <svg
          class="absolute dicon icon-ellipse icon-xs shrink-0"
          viewBox="0 0 16 16"
          stroke="currentColor"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle fill="currentColor" cx="8" cy="8" r="5"></circle>
          <circle cx="8" cy="8" r="6.5" stroke-opacity="0.3" stroke-width="3"></circle>
        </svg>
      </span>
      <span class="ml-6">
        {{ stockMessage }}
      </span>
    </p>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue'
// Importing necessary Vue functions
const props = defineProps({
  unitsInStock: {
    type: Number,
    required: true
  }
})

const stockClass = computed(() =>
  props.unitsInStock > 0
    ? 'bg-green-50 text-green-800'
    : 'bg-red-50 text-red-500'
)

const stockMessage = computed(() =>
  props.unitsInStock > 0
    ? 'In stock, ready to ship'
    : 'Out of stock'
)
</script>
