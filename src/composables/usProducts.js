// src/composables/useProducts.js
import { ref } from 'vue'
import localProducts from '@/data/products.json'

const products = ref([])

export function useProducts() {
  const loadProducts = async () => {
    // Si en el futuro conectas a Supabase, lo haces aquí
    products.value = localProducts
  }

  const getProductByUUID = (uuid) => {
    return products.value.find(p => p.uuid === uuid)
  }

  const getProductPriceByCurrency = (product, currency) => {
    return product.prices.find(p => p.currency === currency)?.value || 0
  }

  return {
    products,
    loadProducts,
    getProductByUUID,
    getProductPriceByCurrency
  }
}
