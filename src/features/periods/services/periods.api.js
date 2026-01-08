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