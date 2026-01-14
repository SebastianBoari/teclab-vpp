import supabase from '@common/lib/supabase'

export const getPeriod = async ({ id, isEnrollmentOpen} = {}) => {
    try{
        let query = supabase
            .from('periods')
            .select('*')
            .order('start_at', { ascending: false })

            if(id) query = query.eq('id', id)
        
            if(isEnrollmentOpen !== undefined){
                const now = new Date().toISOString()

                query = query
                    .lte('enrollment_open_at', now)
                    .gte('enrollment_close_at', now)
            }

        const { data, error } = await query.limit(1).maybeSingle()
        
        if(error) throw error

        return data ?? null
    } catch (error) {
        console.error(`Error en getPeriod: ${error.message}. id: ${id}, isEnrollmentOpen: ${isEnrollmentOpen}`)
        throw error
    }
}

export const getPeriods = async ({ isActive } = {}) => {
    try {
        let query = supabase
            .from('periods')
            .select('*')
            .order('start_at', { ascending: false })

        if (isActive === true) {
            const now = new Date().toISOString()
            query = query
                .lte('start_at', now)
                .gte('end_at', now)
        }

        const { data, error } = await query

        if (error) throw error

        return data ?? []
    } catch (error) {
        console.error(`Error en getPeriods: ${error.message}. isActive: ${isActive}. Detalle: ${error.message}`)
        throw error
    }
}

export const createPeriod = async (periodData) => {
    try {
        const { data, error } = await supabase
            .from('periods')
            .insert(periodData)
            .select()
            .single()

        if (error) throw error
        return data
    } catch (error) {
        console.error(`Error en createPeriod: ${error.message}`, periodData)
        throw error
    }
}

export const updatePeriod = async ({ id, ...updates }) => {
    try {
        if (!id) throw new Error('ID es requerido para actualizar')

        const { data, error } = await supabase
            .from('periods')
            .update(updates)
            .eq('id', id)
            .select()
            .single()

        if (error) throw error
        return data
    } catch (error) {
        console.error(`Error en updatePeriod: ${error.message}. ID: ${id}`, updates)
        throw error
    }
}

export const deletePeriod = async (id) => {
    try {
        const { error } = await supabase
            .from('periods')
            .delete()
            .eq('id', id)

        if (error) throw error
        return true
    } catch (error) {
        // 23503: error de FK
        if (error.code === '23503') {
            console.warn('Intento de borrar periodo con datos asociados')
            throw new Error('No se puede eliminar: El periodo tiene grupos o alumnos asociados.')
        }
        console.error(`Error en deletePeriod: ${error.message}. ID: ${id}`)
        throw error
    }
}