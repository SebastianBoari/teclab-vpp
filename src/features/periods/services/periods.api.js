import supabase from '@common/lib/supabase'
import { adaptPeriodFromAPI } from '@domain/periods/periods.adapters'

export const getPeriod = async () => {
    try{
        const { data, error } = await supabase
        .from('periods')
        .select('*')
        .eq('is_active', true)
        .single()

        if(error) throw error

        return adaptPeriodFromAPI(data)
    } catch (error) {
        console.error('Error fetching periods:', error)
        throw error
    }
}