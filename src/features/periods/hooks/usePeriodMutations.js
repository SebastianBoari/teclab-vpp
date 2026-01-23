import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createPeriod, updatePeriod, deletePeriod } from '../services/periods.api'
import { notify } from '@utils/notify.utils'

export const usePeriodMutations = () => {
    const queryClient = useQueryClient()

    const create = useMutation({
        mutationFn: createPeriod,
        onSuccess: () => {
            notify('success', 'Periodo creado exitosamente')
            queryClient.invalidateQueries({ queryKey: ['periods'] })
        },
        onError: (error) => {
            notify('error', error.message || 'Error al crear periodo')
        }
    })

    const update = useMutation({
        mutationFn: updatePeriod,
        onSuccess: () => {
            notify('success', 'Periodo actualizado correctamente')
            queryClient.invalidateQueries({ queryKey: ['periods'] })
            queryClient.invalidateQueries({ queryKey: ['period'] })
        },
        onError: (error) => {
            notify('error', error.message || 'Error al actualizar periodo')
        }
    })

    const remove = useMutation({
        mutationFn: deletePeriod,
        onSuccess: () => {
            notify('success', 'Periodo eliminado')
            queryClient.invalidateQueries({ queryKey: ['periods'] })
        },
        onError: (error) => {
            notify('error', error.message || 'Error al eliminar periodo')
        }
    })

    return { 
        createPeriod: create, 
        updatePeriod: update, 
        deletePeriod: remove 
    }
}

export default usePeriodMutations