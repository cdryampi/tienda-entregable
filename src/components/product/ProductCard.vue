<template>
  <div
    class="bg-white rounded-3xl shadow-sm hover:shadow-xl transition p-4 cursor-pointer flex flex-col gap-4" @click="$emit('click', product.uuid)"
  >
    <div class="relative overflow-hidden rounded-2xl">
      <img
        :src="product.image"
        :alt="`${product.name} - ${product.type}`"
        class="w-full h-auto object-cover transition-transform duration-300 ease-in-out hover:scale-105"
      />
      <!-- Descuento -->
      <div
        v-if="product.discount?.percentage"
        class="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg"
      >
        -{{ product.discount.percentage }}%
      </div>
    </div>

    <div class="text-xs text-gray-500 uppercase tracking-wider font-medium">
      <a href="javascript:void(0)" class="cursor-pointer line">
        {{ product.category }}
      </a>
    </div>

    <h3 class="text-base font-semibold text-gray-900" @click="$emit('click')">
      <a href="javascript:void(0)" class="cursor-pointer line">
        {{ product.name }} - {{ product.type }}
      </a>
    </h3>

    <div class="text-sm font-bold text-right text-black">
      {{ formattedPrice }}
    </div>
  </div>
</template>

<script setup>
// Tarjeta individual de producto para la vista de listado
import { computed, defineProps, defineEmits } from 'vue'

const props = defineProps({
  product: Object,
  currency: String
})

defineEmits(['click'])

// Conversión rápida de código de moneda a su símbolo
const currencySymbols = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  AUD: '$',
  CAD: '$'
}

// Devuelve el precio del producto con el símbolo correcto
const formattedPrice = computed(() => {
  const prices = props.product.prices
  const price = prices.find(p => p.currency === props.currency)
  const symbol = currencySymbols[props.currency] || props.currency
  return price ? `${symbol}${price.value.toFixed(2)}` : 'N/A'
})
</script>
