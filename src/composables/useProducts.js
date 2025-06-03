import { ref } from 'vue'

const products = ref([])
const currentProduct = ref(null)

const fetchProducts = async () => {
  try {
    const res = await fetch('/products.json')
    if (!res.ok) throw new Error('Failed to fetch products')
    products.value = await res.json()
  } catch (err) {
    console.error('Error fetching products:', err)
    products.value = []
  }
}

const getProductByUUID = (uuid) => {
  return products.value.find(p => p.uuid === uuid)
}

const setCurrentProduct = (uuid) => {
  currentProduct.value = getProductByUUID(uuid)
}

const getFirstProduct = () => {
  // función para obtener el primer producto
  if (products.value.length > 0) {
    currentProduct.value = products.value[0]
  } else {
    currentProduct.value = null
  }
  return currentProduct.value
}

export function useProducts() {
  return {
    products,
    currentProduct,
    fetchProducts,
    getProductByUUID,
    setCurrentProduct,
    getFirstProduct
  }
}
