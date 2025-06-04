<template>
  <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8 border-t border-secondary">
    
    <div class="text-center my-5">
      <h3 class="text-3xl text-black font-semibold mb-2">  
        Send a comment
      </h3>
      <p class="text-2sm text-gray-500">
        explain your experience with this product
      </p>
    </div>
  <div class="grid grid-cols-2 justify-center gap-8">
    <div class="w-full mx-auto my-auto relative">
      <!-- Background decoration -->
      <div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl blur-xl transform rotate-3"></div>
      
      <!-- Image container -->
      <div class="relative bg-white rounded-2xl p-8 shadow-xl border border-gray-100 transform hover:scale-105 transition-transform duration-300">
        <img src="/images/comentario.png" alt="Share your experience" class="m-auto max-h-[400px] drop-shadow-lg" />
        
        <div class="absolute -bottom-4 -left-4 bg-secondary border border-secondary px-4 py-2 rounded-full text-xs text-white shadow-md">
          💬 Join the conversation
        </div>
      </div>
      
      <!-- Text overlay -->
      <div class="mt-6 text-center">
        <h4 class="text-xl font-bold text-white mb-2">Share Your Experience</h4>
        <p class="text-gray-300 text-sm leading-relaxed max-w-sm mx-auto">
          Help other customers make informed decisions by sharing your honest feedback about this product.
        </p>
        
        <!-- Stats or benefits -->
        <div class="flex justify-center space-x-6 mt-4">
          <div class="text-center">
            <div class="text-secondary font-bold text-lg">1000+</div>
            <div class="text-gray-400 text-xs">Happy Customers</div>
          </div>
          <div class="text-center">
            <div class="text-secondary font-bold text-lg">4.8★</div>
            <div class="text-gray-400 text-xs">Average Rating</div>
          </div>
          <div class="text-center">
            <div class="text-secondary font-bold text-lg">24h</div>
            <div class="text-gray-400 text-xs">Response Time</div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full mx-auto mb-6">
  <form @submit.prevent="submitComment" class="w-full max-w-md mx-auto space-y-6 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
    <!-- Header -->


    <!-- Name Field -->
    <div class="space-y-2">
      <label for="username" class="block text-sm font-medium text-gray-700">
        your name
        <span class="text-primary">*</span>
      </label>
      <div class="relative">
        <input
          v-model="name"
          id="username"
          type="text"
          placeholder="write your name here..."
          required
          maxlength="50"
          class="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent transition-all duration-200 placeholder-gray-400 text-gray-900"
          :class="{ 'ring-2 ring-secondary border-secondary': name.length >= 2 && name.length <= 50 }"
        />
        <div class="absolute inset-y-0 right-0 flex items-center pr-3">
          <svg v-if="name.length >= 2" class="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
      <div class="flex justify-between items-center">
        <p v-if="name.length > 0 && name.length < 2" class="text-xs text-primary">Minium 2 characters</p>
        <p class="text-xs text-gray-500 ml-auto">{{ name.length }}/50</p>
      </div>
    </div>

    <!-- Comment Field -->
    <div class="space-y-2">
      <label for="message" class="block text-sm font-medium text-gray-700">
        your comment
        <span class="text-primary">*</span>
      </label>
      <textarea
        v-model="comment"
        id="message"
        rows="4"
        placeholder="write your comment here..."
        required
        maxlength="300"
        class="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent transition-all duration-200 placeholder-gray-400 text-gray-900 resize-none"
        :class="{ 'ring-2 ring-secondary border-secondary': comment.length >= 10 && comment.length <= 300 }"
      ></textarea>
      <div class="flex justify-between items-center">
        <p v-if="comment.length > 0 && comment.length < 10" class="text-xs text-primary">
          Minimum 10 characters
        </p>
        <p class="text-xs ml-auto" :class="remaining < 50 ? 'text-primary' : 'text-gray-500'">
          {{ remaining }} characters remaining
        </p>
      </div>
    </div>

    <!-- Submit Button -->
    <div class="pt-2">
      <button
        type="submit"
        :disabled="disabled || loading"
        class="w-full inline-flex justify-center items-center px-6 py-3 cursor-pointer border border-transparent rounded-xl text-sm font-medium text-white transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl disabled:shadow-md"
        :class="disabled || loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90'"
      >
        <span v-if="!loading" class="flex items-center space-x-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
          <span>
            Submit Comment
          </span>
        </span>
        <span v-else class="flex items-center space-x-2">
          <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Sending...</span>
        </span>
      </button>
    </div>
  </form>
    </div>
  </div>
  </div>


</template>


<script setup>
import { ref, computed } from 'vue'
import { useComments } from '@/composables/useComments'

const { InsertComment, loading } = useComments()
const props = defineProps({
  uuid: { type: String, required: true }
})
const emit = defineEmits(['comment-added'])

const name = ref('')
const comment = ref('')

// Computed properties for better UX
const remaining = computed(() => 300 - comment.value.length)
const disabled = computed(() => 
  !name.value.trim() || 
  name.value.trim().length < 2 ||
  !comment.value.trim() || 
  comment.value.trim().length < 10 ||
  comment.value.length > 300
)

const submitComment = async () => {
  if (disabled.value || loading.value) return
  
  await InsertComment(props.uuid, comment.value.trim(), name.value.trim())
  emit('comment-added')
  comment.value = ''
  name.value = ''
}
</script>
