import supabase from '@common/lib/supabase'

export const getPeriod = async () => {
    try{
        const { data, error } = await supabase
        .from('periods')
        .select('*')
        .eq('isActive', true)
        .single()

        if(error) throw error

        return data
    } catch (error) {
        console.error('Error fetching periods:', error)
        throw error
    }
}