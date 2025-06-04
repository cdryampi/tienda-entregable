<template>
  <div class="border-t border-secondary my-15">

  </div>
  <div class="flex flex-col mx-auto p-6 bg-gray-100 rounded-lg shadow-md pt-5">
    <h3 class="text-xl font-bold mb-4">Comments</h3>

    <div v-if="loading" class="text-gray-500 italic">Cargando comentarios...</div>
    <div v-else-if="comments && comments.length === 0" class="text-gray-500 italic">
      No comments yet for this product.
    </div>

    <ul v-else class="space-y-4">
      <li
        v-for="(comment, index) in paginatedComments"
        :key="comment.id"
        class="p-4 bg-white rounded-lg shadow-sm shadow-secondary"
      >
        <p class="font-semibold text-sm text-black">{{ comment.name }}</p>
        <p class="text-sm text-black mt-1 ml-3.5 my-3">{{ comment.description }}</p>
        <p class="text-xs text-black mt-2">{{ formatDate(comment.created_at) }}</p>
      </li>
    </ul>    <!-- Pagination -->
    <div v-if="totalPages > 1" class="flex flex-col items-center mt-6">
      <!-- Help text -->
      <span class="text-sm text-gray-700 dark:text-gray-400">
        Showing 
        <span class="text-primary">{{ startItem }}</span> 
        to 
        <span class="text-primary">{{ endItem }}</span> 
        of 
        <span class="text-primary">{{ comments.length }}</span> 
        Comments
      </span>
      
      <div class="inline-flex mt-2 xs:mt-0">
        <!-- Previous Button -->
        <button 
          @click="prevPage"
          :disabled="currentPage === 1"
          class="flex items-center justify-center px-4 h-10 text-base font-medium cursor-pointer text-white bg-secondary rounded-s hover:bg-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg class="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
          </svg>
          Prev
        </button>
        
        <!-- Next Button -->
        <button 
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="flex items-center justify-center px-4 h-10 text-base font-medium cursor-pointer text-white bg-secondary border-0 border-s border-secondary rounded-e hover:bg-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
          <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
          </svg>
        </button>
      </div>
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

// Pagination info
const startItem = computed(() => (currentPage.value - 1) * commentsPerPage + 1)
const endItem = computed(() => Math.min(currentPage.value * commentsPerPage, comments.value.length))

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

onMounted(loadComments)

watch(() => props.refreshKey, loadComments)
watch(() => props.uuid, () => {
  loadComments()
  currentPage.value = 1
})

</script>

