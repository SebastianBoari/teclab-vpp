import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  createStudent,
  updateStudent,
  deleteStudent,
  bulkCreateStudents,
} from '../services/students.api'
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

  const bulkCreate = useMutation({
    mutationFn: bulkCreateStudents,
    onSuccess: (result) => {
      if (result.inserted.length > 0) {
        queryClient.invalidateQueries({ queryKey: ['students'] })
      }

      if (result.duplicates.length === 0) {
        notify('success', `Se cargaron los ${result.inserted.length} alumnos correctamente.`)
      } else if (result.inserted.length === 0) {
        notify('error', 'No se cargó ningún alumno nuevo.')
      } else {
        notify(
          'success',
          `Carga parcial: Se guardaron ${result.inserted.length} alumnos, pero ${result.duplicates.length} ya existían.`
        )
      }
    },
    onError: (error) => {
      notify('error', error.message || 'Error crítico al intentar realizar la carga masiva.')
    },
  })
  return {
    createStudent: create,
    updateStudent: update,
    deleteStudent: remove,
    bulkCreateStudents: bulkCreate,
  }
}
export default useStudentsMutations
