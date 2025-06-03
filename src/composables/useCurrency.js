// Composable encargado de la gestión y persistencia de las monedas
// disponibles en la aplicación. Permite cambiar la moneda y
// obtener sus datos asociados (símbolo, código, nombre).
import { ref } from 'vue'

import currencyData from '/src/data/currency.json'

// Lista de monedas disponibles
const currencies = ref([])
// Moneda seleccionada por defecto
const selectedCurrency = ref('EUR')

/**
 * Carga las monedas desde localStorage o desde el JSON
 * y las almacena en el estado reactivo.
 */
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

// Comprueba si el código de moneda existe en la lista
const validCurrency = (code) => {
  return currencies.value.some(c => c.code === code)
}

/**
 * Devuelve la moneda actualmente seleccionada. Si es la
 * primera vez que se invoca, se cargan las monedas.
 */
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


/**
 * Establece la moneda activa y la persiste en localStorage
 */
const setCurrency = (code) => {
  if (validCurrency(code)) {
    selectedCurrency.value = code
    localStorage.setItem("currency", code)
  } else {
    selectedCurrency.value = currencies.value[0]?.code || 'EUR'
    localStorage.setItem("currency", selectedCurrency.value)
  }
}

// Devuelve el objeto con los datos de la moneda actual
const getCurrencyData = () => {
  return currencies.value.find(c => c.code === selectedCurrency.value)
}

/**
 * Hook que expone la API de monedas
 */
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
