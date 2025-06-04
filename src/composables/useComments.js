// Composable dedicado a gestionar los comentarios de los productos
// Se apoya en Supabase para el almacenamiento de los mismos.
import { ref, unref } from 'vue'
import { supabase } from '@/lib/supabase'
import { Toaster, toast } from 'vue-sonner'
import 'vue-sonner/style.css'

export const useComments = () => {
  // Estado reactivo que guarda la lista de comentarios
  const comments = ref([])
  // En caso de error se rellenará esta variable
  const error = ref(null)
  // Estado de carga para mostrar feedback en la UI
  const loading = ref(false)

  const fetchComments = async (uuid) => {
    loading.value = true
    const { data, error: err } = await supabase
      .from('comentarios')
      .select('*')
      .eq('uuid', uuid)
      .order('created_at', { ascending: false })

    if (err) {
      error.value = err
    } else {
      comments.value = data
    }
    loading.value = false
  }

  /**
   * Inserta un nuevo comentario para el producto indicado
   * @param {string} uuid - Identificador del producto
   * @param {string} comentario - Texto del comentario
   * @param {string} nombre - Nombre del usuario
   */
  const InsertComment = async (uuid, comentario, nombre) => {
    loading.value = true
    const { data, error: err } = await supabase
      .from('comentarios')
      .insert([
        {
          uuid: unref(uuid),
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
    }

    await fetchComments(unref(uuid))
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
