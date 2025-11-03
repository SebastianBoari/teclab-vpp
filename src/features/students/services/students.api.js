import supabase from '@/utils/supabase'

export const getStudentByDni = async (dni) => {
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
        console.log(err)
    }
}