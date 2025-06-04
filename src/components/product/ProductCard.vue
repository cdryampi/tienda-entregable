<template>
  <article
    class="bg-white rounded-3xl shadow-secondary shadow-sm hover:shadow-xl transition p-4 cursor-pointer flex flex-col gap-4" @click="$emit('click', product.uuid)"
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
      {{ price }}
    </div>
  </article>
</template>

<script setup>
// Tarjeta individual de producto para la vista de listado
import { computed, defineProps, defineEmits } from 'vue'
import { useCurrency } from '@/composables/useCurrency'


const props = defineProps({
  product: Object,
  required: true,
})

const { selectedCurrency, currencies } = useCurrency()

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
const price = computed(() => {
  const price = props.product.prices.find(p => p.currency === selectedCurrency.value)
  const symbol = currencies.value.find(c => c.code === selectedCurrency.value)?.symbol || '€'
  return price ? `${price.value.toFixed(2)} ${symbol}` : 'N/A'
})
</script>
