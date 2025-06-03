<template>
  <section class="relative w-full h-[40vh] mt-10 container mx-auto">
    <div class="relative w-full h-full flex items-center justify-center container mx-auto">
      <HeroContainer />
    </div>
  </section>
  <section>
    <div class="container mx-auto px-2 py-5 md:py-5">
      <BrandStatement />
    </div>
  </section>
</template>

<script setup>
import HeroContainer from './video/VideoContainer.vue';
import BrandStatement from './BrandStatement.vue';
</script>
