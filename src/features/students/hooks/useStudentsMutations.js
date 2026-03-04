import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createStudent, updateStudent, deleteStudent } from '../services/students.api'
import { notify } from '@utils/notify.utils'

const useStudentsMutations = () => {
  const queryClient = useQueryClient()

  const create = useMutation({
    mutationFn: createStudent,
    onSuccess: () => {
      notify('success', 'Alumno creado exitosamente')
      queryClient.invalidateQueries({ queryKey: ['students'] })
    },
    onError: (error) => notify('error', error.message || 'Error al crear alumno'),
  })

  const update = useMutation({
    mutationFn: updateStudent,
    onSuccess: () => {
      notify('success', 'Alumno actualizado correctamente')
      queryClient.invalidateQueries({ queryKey: ['students'] })
      queryClient.invalidateQueries({ queryKey: ['student'] })
    },
    onError: (error) => notify('error', error.message || 'Error al actualizar alumno'),
  })

  const remove = useMutation({
    mutationFn: deleteStudent,
    onSuccess: () => {
      notify('success', 'Alumno eliminado')
      queryClient.invalidateQueries({ queryKey: ['students'] })
    },
    onError: (error) => notify('error', error.message || 'Error al eliminar alumno'),
  })

  return { createStudent: create, updateStudent: update, deleteStudent: remove }
}
export default useStudentsMutations
