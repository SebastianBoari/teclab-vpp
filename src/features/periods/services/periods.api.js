import supabase from '@common/lib/supabase'
import { getDaysRemaining } from '@common/utils/date.utils'

export const getPeriod = async () => {
    try{
        const { data, error } = await supabase
        .from('periods')
        .select('*')
        .eq('is_active', true)
        .maybeSingle()

        if(error) throw error
        
        if(!data) return null

        data.daysRemaining = getDaysRemaining(data.enrollment_close_at)
        
        return data
    } catch (error) {
        console.error('Error fetching periods:', error)
        throw error
    }
}