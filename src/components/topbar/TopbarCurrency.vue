<script setup>
// Selector de moneda que utiliza el composable de currency
import { onMounted, computed } from 'vue'
import { useCurrency } from '@/composables/useCurrency'

const {
  currencies,
  selectedCurrency,
  loadCurrencies,
  setCurrency,
  getCurrencyData,
  getCurrency
} = useCurrency()

const currentCurrency = computed(() => getCurrencyData())

// Cambia la moneda seleccionada y la persiste
const changeCurrency = async (code) => {
  await setCurrency(code)
}

// const updateUX = async () => {
//   const uuid = document.querySelector("#uuid")?.getAttribute("uuid")
//   if (!uuid) return

//   const products = await import('@/data/products.json').then(m => m.default)
//   const product = products.find(p => p.uuid === uuid)
//   if (product) {
//     const { updateProductUX } = await import('@/product.mjs')
//     await updateProductUX(uuid, product)
//   }
//}

// Al montar el componente cargamos las monedas disponibles
onMounted(() => loadCurrencies(), getCurrency())
</script>

<template>
  <div class="flex items-center justify-center w-full max-w-4xl money-div">
    <div class="relative inline-block text-[0.7rem]">
        <div class="peer cursor-pointer text-white font-bold">
          <p class="flex items-center gap-2 money-selector transition-all duration-300 ease-in-out currency-money">
              <svg class="icon icon-currency icon-xs stroke-1 hidden xl:block" viewBox="0 0 16 16"
                stroke="currentColor" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M0.666687 2.66675V5.33341C0.666687 6.43808 2.45735 7.33341 4.66669 7.33341C6.87602 7.33341 8.66669 6.43808 8.66669 5.33341V2.66675">
                </path>
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M0.666687 5.3335V8.00016C0.666687 9.10483 2.45735 10.0002 4.66669 10.0002C5.69135 10.0002 6.62535 9.80683 7.33335 9.49016">
                </path>
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M0.666687 8V10.6667C0.666687 11.7713 2.45735 12.6667 4.66669 12.6667C5.69135 12.6667 6.62602 12.474 7.33335 12.1573">
                </path>
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M4.66669 4.66675C6.87583 4.66675 8.66669 3.77132 8.66669 2.66675C8.66669 1.56218 6.87583 0.666748 4.66669 0.666748C2.45755 0.666748 0.666687 1.56218 0.666687 2.66675C0.666687 3.77132 2.45755 4.66675 4.66669 4.66675Z">
                </path>
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M7.33337 8V10.6667C7.33337 11.7713 9.12404 12.6667 11.3334 12.6667C13.5427 12.6667 15.3334 11.7713 15.3334 10.6667V8">
                </path>
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M7.33337 10.6667V13.3334C7.33337 14.4381 9.12404 15.3334 11.3334 15.3334C13.5427 15.3334 15.3334 14.4381 15.3334 13.3334V10.6667">
                </path>
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M11.3334 10C13.5425 10 15.3334 9.10457 15.3334 8C15.3334 6.89543 13.5425 6 11.3334 6C9.12424 6 7.33337 6.89543 7.33337 8C7.33337 9.10457 9.12424 10 11.3334 10Z">
                </path>
              </svg>
              <span id="currency_value">{{ currentCurrency?.name }} ({{ currentCurrency?.code }} {{ currentCurrency?.symbol }})</span>
          </p>
        </div>
        <ul
        class="absolute top-full mt-0 hidden peer-hover:flex hover:flex flex-col gap-7 bg-primary rounded-3xl z-100 p-5 w-[180px]"
        >
        <li
          v-for="currency in currencies"
          :key="currency.code"
          :class="{ hidden: currency.code === selectedCurrency }"
        >
          <a
              href="#"
              class="text-white font-bold currency_selector"
              @click.prevent="changeCurrency(currency.code)"
          >
              {{ currency.name }} ({{ currency.code }} {{ currency.symbol }})
          </a>
        </li>
        </ul>
    </div>
  </div>
</template>
