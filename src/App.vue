<script setup>
import { ref, nextTick } from 'vue'
import TopBar from './components/topbar/Topbar.vue'
import NavBar from './components/navbar/Navbar.vue'
import HeroBanner from './components/home/HeroBanner.vue'
import ProductSelection from './components/product/ProductSelection.vue'
import ProductContainer from './components/product/ProductContainer.vue'
import { useProducts } from '@/composables/useProducts'

const { setCurrentProduct } = useProducts()
const productViewRef = ref(null)

const handleProductClick = async (uuid) => {
  setCurrentProduct(uuid)
  await nextTick()
  productViewRef.value?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <div class="w-full h-full flex flex-col">
    <TopBar />
    <NavBar />
    <HeroBanner />
    <main class="flex flex-col items-center justify-center container mx-auto w-full">
      <ProductSelection @select="handleProductClick" />
      <div ref="productViewRef">
        <ProductContainer />
      </div>
    </main>
  </div>
</template>

<style scoped>
</style>
