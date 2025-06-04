<template>
  <article :id="product.uuid" :uuid="product.uuid" class="border-t border-secondary">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 w-full products-container border-b-2 border-gray-200">
      <!-- Imágenes del producto -->
      <ProductImages
        :imageLarge="product.image"
        :imageSmall="product.image"
        :altText="`${product.name} - ${product.type}`"
        :discount="product.discount?.percentage"
        :validUntil="product.discount?.validUntil"
      />


      <!-- Información del producto -->
      <div class="flex flex-col items-start p-5">
        <!-- Categoría -->
        <p><small><a href="#" class="text-gray line">{{ product.category }}</a></small></p>

        <!-- Título y precio -->
        <div class="flex flex-row gap-2 mb-4 price-container">
          <h1 class="text-3xl font-bold mb-4">
            {{ product.name }} - {{ product.type }}
          </h1>
          <p class="text-2xl self-end flex items-baseline gap-1">
            <span class="price" :data-price="JSON.stringify(product.prices)">{{ formattedPrice }}</span>
          </p>
        </div>

        <!-- Afterpay -->
        <ProductAfterpay :afterpay="afterpayText" />

        <!-- Color -->
        <p class="mb-5 mt-5">Color: <span class="text-gray-900 font-bold">{{ product.color || 'Sacred Shadow' }}</span></p>

        <!-- Selección de colores / variantes -->

        <SelectVariant :products="products" @select="setCurrentProduct" :activeUUID="currentProduct?.uuid" />


        <!-- Tallas -->
        <ProductSizes :sizes="product.sizes" />

        <!-- Stock -->
        <ProductStock :units-in-stock="product.unitsInStock" />

        <!-- Cantidad y botón de compra -->
        <ProductQuantity />
      </div>
    </div>

    <!-- Descripción y especificaciones -->
    <aside class="container mx-auto w-full p-5">
      <div class="grid grid-cols-[5fr_2fr] gap-2 mb-5 w-full justify-center items-center product-details-aux">
        <ProductDescription :product="product" />
        <ProductSpecs />
      </div>
    </aside>
    <!-- Comentarios del producto -->
     <section class="container mx-auto w-full p-5">
      <ProductComments :uuid="product.uuid" :refreshKey="refreshKey" />
     </section> 
     <aside class="container mx-auto w-full p-5">
      <CommentForm :uuid="product.uuid" @submit="handleAddComment" />
     </aside>
  </article>
</template>

<script setup>
  // Lógica principal de la vista de producto
  import { defineProps, computed, ref, watch } from 'vue'
  import ProductImages from '@/components/product/ProductImages.vue'
  import ProductSizes from '@/components/product/ProductSizes.vue'
  import ProductStock from '@/components/product/ProductStock.vue'
  import ProductQuantity from '@/components/product/ProductQuantity.vue'
  import ProductDescription from '@/components/product/ProductDescription.vue'
  import ProductAfterpay from '@/components/product/ProductAfterpay.vue'
  import ProductSpecs from '@/components/product/ProductSpecs.vue'
  import SelectVariant from '@/components/product/SelectVariant.vue'
  import ProductComments from '@/components/product/product-coment/ProductComments.vue'
  import CommentForm from '@/components/product/product-coment/CommentForm.vue'
  import { useProducts } from '@/composables/useProducts'
  import { useComments } from '@/composables/useComments'
  import { useCurrency } from '@/composables/useCurrency'



  const { currentProduct, products, setCurrentProduct } = useProducts()
  const { InsertComment } = useComments()

  const props = defineProps({
    product: {
      type: Object,
      required: true
    },
    currencies: {
      type: Array,
      default: () => []
    }
  })
  const refreshKey = ref(Date.now())
  const { selectedCurrency } = useCurrency()
  const currency = selectedCurrency
  // Inserta un nuevo comentario y fuerza la recarga de la lista
  const handleAddComment = async ({ nombre, comentario }) => {
    await InsertComment(props.product.uuid, comentario, nombre)
    // Al cambiar la clave provocamos que ProductComments vuelva a cargar
    refreshKey.value = Date.now()
  }

  // Calcula el precio formateado según la moneda actual
  const formattedPrice = computed(() => {
    const price = props.product.prices.find(p => p.currency === currency.value)
    const symbol = props.currencies.find(c => c.code === currency.value)?.symbol || '€'
    return price ? `${(price.value).toFixed(2)} ${symbol}` : 'N/A'
  })


  // Texto de ayuda para pagos con Afterpay (4 cuotas)
  const afterpayText = computed(() => {
    const price = props.product.prices.find(p => p.currency === currency.value)
    if (!price) return 'Afterpay not available'
    const value = (price.value / 4).toFixed(2)
    const symbol = props.currencies.find(c => c.code === currency.value)?.symbol || '€'
    return `${value} ${symbol}`
  })


</script>
