<template>
  <div class="flex flex-row w-full h-full p-8 rounded-lg">
    <div class="img-container mt-4 relative">
      <img
        id="image-large"
        :src="imageLarge"
        :alt="altText"
        class="img-full bg-gray-100 rounded-lg shadow-md cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105"
      />
      <!-- Descuento + Countdown -->
      <div
        class="flex justify-between items-center absolute top-0 left-0 right-0 p-3"
      >
        <div
          class="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg"
          id="discount"
          :data-discount="discount"
        >
          -{{ discount }}%
        </div>

        <div class="bg-black/80 text-white text-xs px-3 py-1 rounded-md shadow">
          <span
            id="countdown"
            class="font-mono tracking-widest"
            :data-valid-until="validUntil"
          >
            {{ countdown }}
          </span>
        </div>
      </div>
    </div>

    <div class="img-container mt-4">
      <img
        id="image-small"
        :src="imageSmall"
        :alt="altText"
        class="img-min bg-gray-100 rounded-lg shadow-md cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const props = defineProps({
  imageLarge: String,
  imageSmall: String,
  altText: String,
  discount: {
    type: Number,
    default: 0
  },
  validUntil: {
    type: String,
    default: '2025-12-31'
  }
})

const countdown = ref('00:00:00')

const updateCountdown = () => {
  const endDate = new Date(props.validUntil)
  const now = new Date()
  const diff = endDate - now

  if (diff <= 0) {
    countdown.value = 'Ended'
    return
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)

  countdown.value = `${days}d ${hours}h ${minutes}m ${seconds}s`

  setTimeout(updateCountdown, 1000)
}

onMounted(() => {
  updateCountdown()
})
</script>
