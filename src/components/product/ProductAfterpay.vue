<template>
  <p class="mb-5 mt-5">
    or 4 interest-free payments of
    <span class="text-gray-900 font-bold" id="afterpay">{{ afterpay }}</span>
    with
    <span class="bg-secondary cursor-pointer text-sm p-2 rounded-full text-white font-bold">afterpay</span>
  </p>
</template>

<script setup>
// Mensaje informativo para pagos fraccionados
import { defineProps } from 'vue'

const props = defineProps({
  afterpay: {
    type: String,
    required: true
  }
})
</script>
