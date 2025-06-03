<template>
  <div>
    <p>
      <small>
        <a href="#" class="text-gray line">
          {{ product.category }}
        </a>
      </small>
    </p>

    <div class="flex flex-row gap-2 mb-4 price-container">
      <h1 class="text-3xl font-bold mb-4">
        {{ product.name }} - {{ product.type }}
      </h1>
      <p class="text-2xl self-end flex items-baseline gap-1">
        <span class="price">{{ formattedPrice }}</span>
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCurrency } from '@/composables/useCurrency'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const { getCurrencyData } = useCurrency()

const formattedPrice = computed(() => {
  const currency = getCurrencyData()
  const price = props.product.prices.find(p => p.currency === currency.code)
  if (!price) return 'N/A'

  const discounted = props.product.discount?.percentage || 0
  const finalPrice = price.value - (price.value * discounted / 100)

  return `${finalPrice.toFixed(2)}${currency.symbol}`
})
</script>
