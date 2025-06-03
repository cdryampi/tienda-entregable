<template>
  <ul class="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-gray-800 font-bold">
    <template v-for="(link, index) in navLinks" :key="index">
      <li v-if="link.isLogo">
        <Logo />
      </li>
      <li v-else>
        <a
          :href="link.href"
          class="inline-block p-3 hover:bg-black hover:text-white hover:rounded-full transition-all duration-300 ease-in-out"
        >
          {{ link.label }}
        </a>
      </li>
    </template>
  </ul>
</template>

<script setup>
// Enlaces de navegación principales
import { navLinks } from '@/data/navLinks.js'
import Logo from './NavbarLogo.vue'
</script>
