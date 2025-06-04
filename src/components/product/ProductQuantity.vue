<template>
  <form class="mx-auto w-full max-w-xs" @submit.prevent>
    <label for="quantity-input" class="block mb-2 text-sm font-medium text-gray-900 sr-only">
      Quantity
    </label>
    <div class="relative flex items-center max-w-[8rem]">
      <button
        type="button"
        @click="decrease"
        class="group hover:bg-black hover:text-white border border-black rounded-s-lg p-3 h-11 focus:ring-black focus:ring-2 focus:outline-none"
      >
        <svg class="w-3 h-3 text-black group-hover:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"/>
        </svg>
      </button>
      <input
        type="number"
        id="quantity-input"
        v-model="quantity"
        @input="onInput"
        class="bg-white border-x-0 border-gray-300 h-11 text-center text-black text-sm focus:ring-black focus:border-black block w-full py-2.5"
        min="1"
        max="9"
      />
      <button
        type="button"
        @click="increase"
        class="group bg-white hover:bg-black hover:text-white border border-black rounded-e-lg p-3 h-11 focus:ring-black focus:ring-2 focus:outline-none"
      >
        <svg class="w-3 h-3 text-black group-hover:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
        </svg>
      </button>
    </div>
  </form>
</template>

<script setup>
// Controla la cantidad de productos a añadir
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Number,
    default: 1
  }
})

const emit = defineEmits(['update:modelValue'])

const quantity = ref(props.modelValue)

const onInput = (e) => {
  let val = parseInt(e.target.value, 10)
  if (isNaN(val) || val < 1) val = 1
  if (val > 9) val = 9
  quantity.value = val
}

// Incrementa la cantidad sin superar el máximo de 9
const increase = () => {
  if (quantity.value < 9) quantity.value++
}

// Decrementa la cantidad sin bajar de 1
const decrease = () => {
  if (quantity.value > 1) quantity.value--
}

// Emitimos el nuevo valor al componente padre cuando cambia
watch(quantity, (val) => {
  emit('update:modelValue', val)
})
</script>
