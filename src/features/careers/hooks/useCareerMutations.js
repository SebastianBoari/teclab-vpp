import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createCareer, updateCareer, deleteCareer } from '../services/careers.api'
import { notify } from '@utils/notify.utils'

export const useCareerMutations = () => {
  const queryClient = useQueryClient()

  const create = useMutation({
    mutationFn: createCareer,
    onSuccess: () => {
      notify('success', 'Carrera creada exitosamente')
      queryClient.invalidateQueries({ queryKey: ['careers'] })
    },
    onError: (error) => {
      notify('error', error.message || 'Error al crear carrera')
    },
  })

  const update = useMutation({
    mutationFn: updateCareer,
    onSuccess: () => {
      notify('success', 'Carrera actualizada correctamente')
      queryClient.invalidateQueries({ queryKey: ['careers'] })
      queryClient.invalidateQueries({ queryKey: ['career'] })
    },
    onError: (error) => {
      notify('error', error.message || 'Error al actualizar periodo')
    },
  })

  const remove = useMutation({
    mutationFn: deleteCareer,
    onSuccess: () => {
      notify('success', 'Carrera eliminada')
      queryClient.invalidateQueries({ queryKey: ['careers'] })
    },
    onError: (error) => {
      notify('error', error.message || 'Error al eliminar carrera')
    },
  })

  return {
    createCareer: create,
    updateCareer: update,
    deleteCareer: remove,
  }
}

export default useCareerMutations
