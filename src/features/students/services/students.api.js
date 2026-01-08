import supabase from '@common/lib/supabase'

export const getStudent = async ({ id, dni } = {}) => {
    try{
        if (!id && !dni) throw new Error('Se requiere ID o DNI para buscar al estudiante.')

        let query = supabase
            .from('students')
            .select('*')

            if(id) query = query.eq('id', id)
            if(dni) query = query.eq('dni', dni)  
        
        const { data, error } = await query.maybeSingle()

        if(error) throw error

        return data ?? null
    } catch (error) {
        console.error(`Error intentando obtener la información del estudiante: ${error}`)
        throw error
    }
}