import supabase from '@common/lib/supabase'

export const getStudent = async (dni) => {
    try{
        if(!dni) throw new Error('DNI is required')

        const { data, error } = await supabase
        .from('students')
        .select('*')
        .eq('dni', dni)
        .single()
        
        if(error) throw error

        return data
    } catch (err) {
        if (err.code === 'PGRST116' && dni) {
            throw new Error(`No se encontró estudiante con el DNI ${dni}.`)
        } else if (err.code) {
            console.error(`Error intentando obtener la información del estudiante (código ${err.code}):`, err.message)
        }
        
        throw err
    }
}