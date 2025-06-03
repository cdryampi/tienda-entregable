<template>
  <section v-if="currentProduct" class="w-full mt-5 border-top border-gray-200">
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

const { currentProduct, fetchProducts, setCurrentProduct, getFirstProduct } = useProducts()

const currency = ref(localStorage.getItem('currency') || 'EUR')
const currencies = ref(JSON.parse(localStorage.getItem('currencies')) || [])

// Cargar productos al montar
onMounted(async () => {
  await fetchProducts()
  await getFirstProduct()
})

const handleVariantChange = (uuid) => {
  setCurrentProduct(uuid)
}
</script>
