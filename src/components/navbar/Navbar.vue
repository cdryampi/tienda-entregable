<template>
  <nav class="bg-white justify-center items-center flex h-16 container mx-auto pt-10 header-nav">
    <div class="flex justify-between items-center w-full">
      <NavbarIcons position="search" />
      <NavbarLinks />
      <NavbarIcons position="all" />
    </div>
  </nav>
</template>

<script setup>
// Componente principal de navegación superior
import NavbarLogo from './NavbarLogo.vue'
import NavbarLinks from './NavbarLinks.vue'
import NavbarIcons from './NavbarIcons.vue'
</script>
