<template>
  <form @submit.prevent="submitComment" class="w-full max-w-md mx-auto space-y-5 bg-white p-6 rounded-xl shadow-md dark:bg-gray-800">
    <div>
      <label for="username" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre</label>
      <input
        v-model="name"
        id="username"
        type="text"
        placeholder="Tu nombre"
        required
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-black dark:focus:border-black"
      />
    </div>

    <div>
      <label for="message" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Comentario</label>
      <textarea
        v-model="comment"
        id="message"
        rows="4"
        placeholder="Escribe tu comentario aquí..."
        required
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-black dark:focus:border-black"
      />
    </div>

    <div class="text-right">
      <button
        type="submit"
        class="inline-flex justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
      >
        Enviar comentario
      </button>
    </div>
  </form>
</template>


<script setup>
import { ref } from 'vue'
import { useComments } from '@/composables/useComments'

const { InsertComment } = useComments()
const props = defineProps({
  uuid: { type: String, required: true }
})
const emit = defineEmits(['comment-added'])

const name = ref('')
const comment = ref('')

const submitComment = async () => {
  await InsertComment(props.uuid, comment.value, name.value)
  emit('comment-added')
  comment.value = ''
  name.value = ''
}
</script>
