import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createTutor, updateTutor, deleteTutor } from '../services/tutors.api'
import { notify } from '@utils/notify.utils'

const useTutorMutations = () => {
  const queryClient = useQueryClient()

  const create = useMutation({
    mutationFn: createTutor,
    onSuccess: () => {
      notify('success', 'Tutor creado exitosamente')
      queryClient.invalidateQueries({ queryKey: ['tutors'] })
    },
    onError: (error) => notify('error', error.message || 'Error al crear tutor'),
  })

  const update = useMutation({
    mutationFn: updateTutor,
    onSuccess: () => {
      notify('success', 'Tutor actualizado correctamente')
      queryClient.invalidateQueries({ queryKey: ['tutors'] })
      queryClient.invalidateQueries({ queryKey: ['tutor'] })
    },
    onError: (error) => notify('error', error.message || 'Error al actualizar tutor'),
  })

  const remove = useMutation({
    mutationFn: deleteTutor,
    onSuccess: () => {
      notify('success', 'Tutor eliminado')
      queryClient.invalidateQueries({ queryKey: ['tutors'] })
    },
    onError: (error) => notify('error', error.message || 'Error al eliminar tutor'),
  })

  return { createTutor: create, updateTutor: update, deleteTutor: remove }
}
export default useTutorMutations
