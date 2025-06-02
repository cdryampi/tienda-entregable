<script setup>
import { socialLinks } from '@/data/socialLinks.js' // crea este archivo como hicimos antes
</script>

<template>
   <ul class="flex items-center justify-center w-full max-w-3xl social-links " >
      <li class="inline-block mr-4" v-for="socialLinks in socialLinks" :key="socialLinks.id">
         <a :href="socialLinks.href" class="text-white hover:tran bounce-div" title="Follow us on {{ socialLinks.name }}">
            <svg class="icon icon-sm"
               viewBox="0 0 24 24" stroke="none" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
               <path
                  :d="socialLinks.svgPath">
               </path>
            </svg>
         </a>
      </li>
   </ul>
</template>
