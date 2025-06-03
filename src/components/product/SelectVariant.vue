<template>
  <div class="flex flex-wrap gap-2" id="links-container">
    <a
      v-for="product in products"
      :key="product.uuid"
      href="#"
      class="dance-link"
      :uuid="product.uuid"
      @click.prevent="$emit('select', product.uuid)"
    >
      <img
        :src="product.image"
        :alt="product.name"
        class="w-16 h-16 bg-gray-100 rounded-lg shadow-md cursor-pointer hover:scale-105 transition-transform"
      />
    </a>
  </div>
</template>

<script setup>
defineProps({
  products: {
    type: Array,
    activeUUID: String
  }
})

defineEmits(['select'])
</script>
