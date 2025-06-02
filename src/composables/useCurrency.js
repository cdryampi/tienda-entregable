// src/composables/useCurrency.js
import { ref } from 'vue'

import currencyData from '/src/data/currency.json' // Assuming you have a JSON file with currency data

const currencies = ref([])
const selectedCurrency = ref('EUR')

const loadCurrencies = async () => {
  try {
    const cached = localStorage.getItem("currencies")
    if (cached) {
      currencies.value = JSON.parse(cached)
    } else {
      currencies.value = currencyData
      localStorage.setItem("currencies", JSON.stringify(currencyData))
    }
  } catch (error) {
    console.error("Error loading currencies:", error)
    currencies.value = []
  }
}

const validCurrency = (code) => {
  return currencies.value.some(c => c.code === code)
}

const getCurrency = async () => {
  if (currencies.value.length === 0) {
    await loadCurrencies()
  }

  const stored = localStorage.getItem("currency")
  if (stored && validCurrency(stored)) {
    selectedCurrency.value = stored
  } else {
    selectedCurrency.value = currencies.value[0]?.code || 'EUR'
    localStorage.setItem("currency", selectedCurrency.value)
  }

  return selectedCurrency.value
}


const setCurrency = (code) => {
  if (validCurrency(code)) {
    selectedCurrency.value = code
    localStorage.setItem("currency", code)
  } else {
    selectedCurrency.value = currencies.value[0]?.code || 'EUR'
    localStorage.setItem("currency", selectedCurrency.value)
  }
}

const getCurrencyData = () => {
  return currencies.value.find(c => c.code === selectedCurrency.value)
}

export function useCurrency() {
  return {
    currencies,
    selectedCurrency,
    loadCurrencies,
    getCurrency,
    setCurrency,
    getCurrencyData
  }
}
