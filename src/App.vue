<script setup>

import  TopBar from './components/topbar/Topbar.vue'
import  NavBar from './components/navbar/Navbar.vue'
import HeroBanner from './components/home/HeroBanner.vue'
import ProductSelection from './components/product/ProductSelection.vue'
</script>

<template>
  <div class="w-full h-full flex flex-col">
  <TopBar/>
  <NavBar/>
  <HeroBanner/>
  <main class="flex flex-col items-center justify-center container mx-auto w-full">
    <ProductSelection/>
  </main>
  </div>
</template>

<style scoped>

</style>
