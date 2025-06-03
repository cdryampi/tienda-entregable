<template>
  <div class="w-full mt-6">
    <h3 class="text-xl font-bold mb-4">Comments</h3>

    <div v-if="comments && comments.length === 0" class="text-gray-500 italic">
      No comments yet for this product.
    </div>

    <ul v-else class="space-y-4">
      <li
        v-for="(comment, index) in comments"
        :key="index"
        class="p-4 bg-gray-100 rounded-lg shadow-sm"
      >
        <p class="font-semibold text-sm text-gray-800">{{ comment.name }}</p>
        <p class="text-sm text-gray-600 mt-1">{{ comment.description }}</p>
        <p class="text-xs text-gray-400 mt-2">{{ formatDate(comment.created_at) }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useComments} from '@/composables/useComments'

const props = defineProps({ 
  uuid: String,
  refreshKey: {
    type: [Number, String]
  }
})
const { fetchComments, comments } = useComments()

const loadComments = async () => {
  if (props.uuid) {
    await fetchComments(props.uuid)
  }
}
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

