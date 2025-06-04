import { ref, unref } from 'vue'
import { supabase } from '@/lib/supabase'
import { toast } from 'vue-sonner'
import 'vue-sonner/style.css'

const commentCache = new Map()
const loadingByUUID = new Map()

export const useComments = () => {
  const comments = ref([])
  const error = ref(null)
  const loading = ref(false)

  const fetchComments = async (uuid) => {
    const key = unref(uuid)

    if (loadingByUUID.get(key)) return // evitar llamada duplicada
    loadingByUUID.set(key, true)
    loading.value = true

    // Usa el caché si ya está disponible
    if (commentCache.has(key)) {
      comments.value = commentCache.get(key)
      loading.value = false
      loadingByUUID.set(key, false)
      return
    }

    const { data, error: err } = await supabase
      .from('comentarios')
      .select('*')
      .eq('uuid', key)
      .order('created_at', { ascending: false })

    if (err) {
      error.value = err
    } else {
      comments.value = data
      commentCache.set(key, data)
    }

    loading.value = false
    loadingByUUID.set(key, false)
  }

  const InsertComment = async (uuid, comentario, nombre) => {
    console.log('Insertando comentario:', comentario, nombre)
    const key = unref(uuid)
    loading.value = true

    const { data, error: err } = await supabase
      .from('comentarios')
      .insert([
        {
          uuid: key,
          description: unref(comentario),
          name: unref(nombre)
        }
      ])

    if (err) {
      error.value = err
      toast.error('Error al añadir el comentario', {
        position: 'top-right',
        duration: 3000
      })
    } else {
      toast.success('Comentario añadido', {
        position: 'top-right',
        duration: 3000
      })

      commentCache.delete(key) // 🧼 invalidamos el cache
      await fetchComments(key)
    }

    loading.value = false
  }

  return {
    comments,
    error,
    loading,
    fetchComments,
    InsertComment
  }
}
