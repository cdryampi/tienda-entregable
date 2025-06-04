<template>
  <div class="w-full mt-6">
    <h3 class="text-xl font-bold mb-4">Comments</h3>

    <div v-if="loading" class="text-gray-500 italic">Cargando comentarios...</div>
    <div v-else-if="comments && comments.length === 0" class="text-gray-500 italic">
      No comments yet for this product.
    </div>

    <ul v-else class="space-y-4">
      <li
        v-for="(comment, index) in paginatedComments"
        :key="index"
        class="p-4 bg-gray-100 rounded-lg shadow-sm"
      >
        <p class="font-semibold text-sm text-gray-800">{{ comment.name }}</p>
        <p class="text-sm text-gray-600 mt-1">{{ comment.description }}</p>
        <p class="text-xs text-gray-400 mt-2">{{ formatDate(comment.created_at) }}</p>
      </li>
    </ul>
    <div v-if="totalPages > 1" class="flex justify-center mt-4 space-x-2">
      <button
        class="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        :disabled="currentPage === 1"
        @click="prevPage"
      >
        Prev
      </button>
      <span class="px-2">{{ currentPage }} / {{ totalPages }}</span>
      <button
        class="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        :disabled="currentPage === totalPages"
        @click="nextPage"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
// Lista y gestión de comentarios almacenados en Supabase
import { ref, watch, onMounted, computed } from 'vue'
import { useComments } from '@/composables/useComments'

const props = defineProps({ 
  uuid: String,
  refreshKey: {
    type: [Number, String]
  }
})
const { fetchComments, comments, loading } = useComments()

const commentsPerPage = 5
const currentPage = ref(1)
const paginatedComments = computed(() =>
  comments.value.slice((currentPage.value - 1) * commentsPerPage, currentPage.value * commentsPerPage)
)
const totalPages = computed(() => Math.ceil(comments.value.length / commentsPerPage))
const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}
const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}

// Obtiene los comentarios asociados al UUID del producto
const loadComments = async () => {
  if (props.uuid) {
    await fetchComments(props.uuid)
    currentPage.value = 1
  }
}
// Formatea una fecha ISO a un formato legible
const formatDate = (iso) => {
  const d = new Date(iso)
  return d.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
watch(() => props.refreshKey, loadComments)
watch(() => props.uuid, loadComments)

onMounted(()=> fetchComments(props.uuid))
</script>

