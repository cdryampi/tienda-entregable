<template>
  <section v-if="currentProduct" class="w-full mt-5 border-t border-gray-200">
    <ProductView
      :product="currentProduct"
      :currency="currency"
      :currencies="currencies"
      @select-variant="handleVariantChange"
    />
  </section>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import ProductView from '@/components/product/ProductView.vue'
import { useProducts } from '@/composables/useProducts'

const { currentProduct, fetchProducts, setCurrentProduct } = useProducts()

const currency = ref(localStorage.getItem('currency') || 'EUR')
const currencies = ref(JSON.parse(localStorage.getItem('currencies')) || [])

// Cargar productos al montar
onMounted(async () => {
  await fetchProducts()
  setCurrentProduct('9b52127f-52b9-4e87-a310-2758ead230bc') // UUID por defecto
})

const handleVariantChange = (uuid) => {
  setCurrentProduct(uuid)
}
</script>
