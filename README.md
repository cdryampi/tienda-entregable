# Migración de Tienda de Ropa de Vanilla JS a Vue 3

## Análisis del Proyecto Original (Sample)

El proyecto original es una tienda de ropa llamada "Flowers & Saints" desarrollada en Vanilla JavaScript con las siguientes características:

### Estructura del Proyecto Original
```
sample/
├── index.html              # Página principal estática
├── src/
│   ├── main.js             # Punto de entrada principal
│   ├── style.css           # Estilos personalizados
│   ├── data/
│   │   ├── products.json   # Base de datos de productos
│   │   └── currency.json   # Configuración de monedas
│   ├── images/             # Iconos e imágenes
│   ├── modules/
│   │   ├── product.mjs     # Lógica de productos
│   │   ├── currency.mjs    # Gestión de monedas
│   │   └── utils.mjs       # Utilidades generales
│   └── products/           # Imágenes de productos
```

### Funcionalidades Identificadas

1. **Gestión de Productos**
   - Carga dinámica desde JSON
   - Navegación entre productos por UUID
   - Actualización de interfaz (nombre, precio, imagen, stock, etc.)
   - Selector de tallas
   - Contador de cantidad
   - Sistema de descuentos con countdown

2. **Sistema de Monedas**
   - Soporte multicurrencia (EUR, USD, GBP, JPY, AUD, CAD)
   - Persistencia en localStorage
   - Conversión automática de precios
   - Interfaz de selección de moneda

3. **Interfaz de Usuario**
   - Header con redes sociales y navegación
   - Galería de productos con thumbnails
   - Detalles del producto (descripción, especificaciones)
   - Formularios de cantidad y compra
   - Indicadores de stock

4. **Tecnologías Utilizadas**
   - Vanilla JavaScript con ES6 modules
   - Tailwind CSS para estilos
   - Flowbite para componentes UI
   - LocalStorage para persistencia

## Plan de Migración a Vue 3

### 1. Arquitectura de Componentes Vue

```
src/
├── App.vue                    # Componente raíz
├── components/
│   ├── layout/
│   │   ├── Header.vue         # Header con redes sociales
│   │   ├── Navigation.vue     # Navegación principal
│   │   └── CurrencySelector.vue # Selector de monedas
│   ├── product/
│   │   ├── ProductGallery.vue # Galería de imágenes
│   │   ├── ProductInfo.vue    # Información del producto
│   │   ├── ProductDetails.vue # Detalles y especificaciones
│   │   ├── SizeSelector.vue   # Selector de tallas
│   │   ├── QuantitySelector.vue # Contador de cantidad
│   │   └── AddToCart.vue      # Botón de agregar al carrito
│   └── ui/
│       ├── CountdownTimer.vue # Timer de descuentos
│       └── StockIndicator.vue # Indicador de stock
├── composables/
│   ├── useProducts.js         # Lógica de productos
│   ├── useCurrency.js         # Gestión de monedas
│   └── useCart.js            # Lógica del carrito
├── stores/
│   ├── products.js           # Store de productos (Pinia)
│   ├── currency.js           # Store de monedas (Pinia)
│   └── cart.js              # Store del carrito (Pinia)
└── utils/
    └── formatters.js         # Utilidades de formato
```

### 2. Migración por Módulos

#### A. Sistema de Productos (`product.mjs` → Vue)

**Antes (Vanilla JS):**
```javascript
export const updateProductUX = async (productId, data) => {
  // Manipulación directa del DOM
  const name_DOM = document.querySelector(`#name`);
  name_DOM.textContent = name;
}
```

**Después (Vue Composable):**
```javascript
// composables/useProducts.js
export function useProducts() {
  const currentProduct = ref(null)
  const products = ref([])
  
  const fetchProducts = async () => {
    // Lógica de carga
  }
  
  const setCurrentProduct = (uuid) => {
    currentProduct.value = products.value.find(p => p.uuid === uuid)
  }
  
  return { currentProduct, products, fetchProducts, setCurrentProduct }
}
```

#### B. Sistema de Monedas (`currency.mjs` → Vue)

**Migración a Pinia Store:**
```javascript
// stores/currency.js
export const useCurrencyStore = defineStore('currency', {
  state: () => ({
    currencies: [],
    currentCurrency: 'EUR'
  }),
  getters: {
    formatPrice: (state) => (prices, discount = 0) => {
      // Lógica de formateo
    }
  },
  actions: {
    async loadCurrencies() {
      // Carga desde JSON
    },
    setCurrency(currency) {
      // Cambio de moneda con persistencia
    }
  }
})
```

#### C. Gestión de Estado Global

**Implementación con Pinia:**
- **Products Store**: Manejo de productos, filtros, búsqueda
- **Currency Store**: Monedas, conversiones, persistencia
- **Cart Store**: Carrito de compras, cantidades, cálculos

### 3. Componentes Clave

#### ProductGallery.vue
```vue
<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
    <div class="flex flex-row w-full h-full p-8">
      <div class="img-container mt-4 relative">
        <img :src="currentProduct?.image" :alt="currentProduct?.name" 
             class="img-full bg-gray-100 rounded-lg shadow-md">
        <DiscountBadge :discount="currentProduct?.discount" />
        <CountdownTimer :validUntil="currentProduct?.discount?.validUntil" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useProductsStore } from '@/stores/products'

const productsStore = useProductsStore()
const currentProduct = computed(() => productsStore.currentProduct)
</script>
```

#### CurrencySelector.vue
```vue
<template>
  <div class="relative inline-block">
    <div @click="toggleDropdown" class="cursor-pointer text-white font-bold">
      {{ formatCurrencyDisplay(currentCurrency) }}
    </div>
    <ul v-show="showDropdown" class="absolute top-full mt-0 flex flex-col">
      <li v-for="currency in availableCurrencies" :key="currency.code">
        <a @click="selectCurrency(currency.code)" class="text-white font-bold">
          {{ formatCurrencyDisplay(currency) }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useCurrencyStore } from '@/stores/currency'

const currencyStore = useCurrencyStore()
const showDropdown = ref(false)

const currentCurrency = computed(() => currencyStore.currentCurrency)
const availableCurrencies = computed(() => currencyStore.currencies)
</script>
```

### 4. Ventajas de la Migración

#### Mantenibilidad
- **Componentes reutilizables**: Cada funcionalidad encapsulada
- **Separación de responsabilidades**: Lógica separada de la presentación
- **Tipado con TypeScript**: Mayor robustez del código

#### Performance
- **Reactividad optimizada**: Solo se actualizan componentes necesarios
- **Virtual DOM**: Renderizado eficiente
- **Code splitting**: Carga optimizada de recursos

#### Escalabilidad
- **Gestión de estado centralizada**: Pinia para estado global
- **Routing**: Vue Router para navegación SPA
- **Composables**: Lógica reutilizable entre componentes

#### Developer Experience
- **Hot Module Replacement**: Desarrollo más rápido
- **Vue DevTools**: Debugging avanzado
- **Ecosystem**: Amplio ecosistema de librerías

### 5. Cronograma de Migración

1. **Fase 1**: Setup inicial de Vue 3 + Vite
2. **Fase 2**: Migración de stores (Pinia)
3. **Fase 3**: Componentes de layout (Header, Navigation)
4. **Fase 4**: Componentes de producto (Gallery, Info, Details)
5. **Fase 5**: Funcionalidades avanzadas (Cart, Checkout)
6. **Fase 6**: Testing y optimización
7. **Fase 7**: Deployment y documentación

### 6. Consideraciones Técnicas

- **Tailwind CSS**: Mantenimiento de la misma librería de estilos
- **Data fetching**: Migración de fetch a composables con manejo de errores
- **LocalStorage**: Integración con stores de Pinia
- **SEO**: Consideración de SSR con Nuxt.js en el futuro
- **Testing**: Implementación de unit tests con Vitest

Este plan proporciona una migración estructurada que mantiene todas las funcionalidades existentes mientras mejora la arquitectura, mantenibilidad y escalabilidad del proyecto.
