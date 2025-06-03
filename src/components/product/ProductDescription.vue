<template>
  <div class="flex flex-col w-full gap-5">
    <h2 class="text-2xl font-bold mb-4">Product Details</h2>
    <p class="text-gray-700 mb-4 leading-relaxed">
      {{ product.description }}
    </p>
    <div class="frabric-details mb-4 w-full max-w-4xl">
      <h3 class="text-lg font-semibold mb-2">Fabric Details:</h3>
      <ul class="max-w-md space-y-1 list-disc" v-if="product.frabric_details?.length">
        <li v-for="(detail, index) in product.frabric_details" :key="index">
          <p>{{ detail }}</p>
        </li>
      </ul>
      <p v-else>No fabric details available.</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
    required: true
  }
})
</script>
