<template>
  <!-- Sección que muestra un listado reducido de productos -->
  <section class="py-8 px-4 max-w-7xl mx-auto border-t border-secondary">
    <h2 class="text-3xl font-bold mb-6">
      Only a <span class="underline decoration-secondary">Few Pieces</span> Left
    </h2>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <ProductCard
        v-for="p in limited"
        :key="p.uuid"
        :product="p"
        @click="$emit('select', p.uuid)"
      />
    </div>
  </section>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import ProductCard from './ProductCard.vue'
import { useProducts } from '@/composables/useProducts'

const { products, fetchProducts, setCurrentProduct } = useProducts()

// Cargamos la lista de productos cuando el componente se monta
onMounted(() => fetchProducts())

// Solo mostramos los primeros 6 productos de la lista
const limited = computed(() => products.value.slice(0, 6))
defineEmits(['select'])

</script>
