<script setup>
import { ref, computed } from 'vue'
import navbarIcons from '@/data/navbarIcons.json'

const props = defineProps({
  position: {
    type: String,
    default: 'search'
  }
})

const searchIcon = computed(() =>
  navbarIcons.find(icon => icon.name === 'search')
)

const allIconsExceptSearch = computed(() =>
  navbarIcons.filter(icon => icon.name !== 'search')
)
</script>

<template>
  <div class="flex items-center justify-center w-1xl">
    <template v-if="position === 'search'">
      <a
        :href="searchIcon?.href"
        class="text-gray-800 font-bold text-lg mr-4 bounce-div"
      >
        <svg
          :class="`icon ${searchIcon.icon} icon-lg`"
          viewBox="0 0 24 24"
          stroke="currentColor"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path :d="searchIcon.svgPath"></path>
        </svg>
      </a>
    </template>
    <template v-else>
      <a
        v-for="item in allIconsExceptSearch"
        :key="item.name"
        :href="item.href"
        class="text-gray-800 font-bold text-lg mr-4 bounce-div"
      >
        <svg
          :class="`icon ${item.icon} icon-lg`"
          viewBox="0 0 24 24"
          stroke="currentColor"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
        <rect width="10.5" height="10.5" x="6.75" y="1.75" rx="5.25"></rect>
          <path :d="item.svgPath"></path>
        </svg>
      </a>
    </template>
  </div>
</template>
