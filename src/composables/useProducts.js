// Composable para gestionar los productos de la tienda
// -----------------------------------------------------
// Aquí centralizamos toda la lógica relacionada con la
// obtención y selección de productos. Esto facilita su
// reutilización en distintos componentes.
import { ref } from 'vue'

// Lista reactiva de productos disponible en el JSON local
const products = ref([])
// Producto actualmente seleccionado
const currentProduct = ref(null)

/**
 * Carga el listado de productos desde el fichero JSON
 * ubicado en /public/products.json. Si ocurre un error
 * se devuelve un arreglo vacío.
 */
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

/**
 * Devuelve un producto a partir de su UUID
 * @param {string} uuid - identificador único
 */
const getProductByUUID = (uuid) => {
  return products.value.find(p => p.uuid === uuid)
}

/**
 * Establece el producto actual en función del UUID
 * @param {string} uuid
 */
const setCurrentProduct = (uuid) => {
  currentProduct.value = getProductByUUID(uuid)
}

/**
 * Selecciona el primer producto disponible en la lista
 * y lo asigna como producto actual.
 */
const getFirstProduct = () => {
  if (products.value.length > 0) {
    currentProduct.value = products.value[0]
  } else {
    currentProduct.value = null
  }
  return currentProduct.value
}

/**
 * Hook que expone las funciones y propiedades de productos
 */
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
