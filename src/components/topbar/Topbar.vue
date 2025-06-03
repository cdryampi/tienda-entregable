<script setup>
// Barra superior con mensaje, redes sociales y selector de moneda
import TopbarSocial from './TopbarSocial.vue'
import TopbarMessage from './TopbarMessage.vue'
import TopbarCurrency from './TopbarCurrency.vue'
</script>

<template>
  <header class="bg-primary justify-center items-center flex h-16 gap-4 p-4">
    <div class="flex items-center justify-center w-full max-w-4xl">
      <TopbarSocial />
    </div>
    <div class="flex items-center justify-center w-full max-w-4xl">
      <TopbarMessage />
    </div>
    <div class="flex items-center justify-center w-full max-w-4xl money-div">
      <TopbarCurrency />
    </div>
  </header>
</template>
