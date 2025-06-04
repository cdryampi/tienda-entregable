<template>
  <!-- Contenedor principal donde se muestra la vista detallada del producto -->
  <section v-if="currentProduct" class="w-full mt-5 border-top border-secondary">
    <ProductView
      :product="currentProduct"
      :currencies="currencies"
      @select-variant="handleVariantChange"
    />
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import ProductView from '@/components/product/ProductView.vue'
import { useProducts } from '@/composables/useProducts'
import { useCurrency } from '@/composables/useCurrency'

const { currentProduct, fetchProducts, setCurrentProduct, getFirstProduct } = useProducts()
const { selectedCurrency, currencies } = useCurrency()

// Cargar productos al montar el componente
onMounted(async () => {
  await fetchProducts()
  await getFirstProduct()
})

// Se ejecuta cuando el usuario selecciona otra variante
const handleVariantChange = (uuid) => {
  setCurrentProduct(uuid)
}
</script>

