import supabase from '@/utils/supabase'

/**
 * Fetches a period by its ID from the `periods` table.
 *
 * @param {number|string} periodId - The ID of the period to retrieve.
 * @returns {Promise<Object[]|Error>} The matching period record(s) or an error.
 * @throws {Error} If the query fails.
 */
export const getPeriodById = async (periodId) => {
    try {
        const { data, error } = await supabase
        .from('periods')
        .select('*')
        .eq('id', periodId)

        if(error) throw error

        return data
    } catch(error){
        return error
    }
}

export const getPeriodsByYear = async (year) => {
  try {
    const start = `${year}-01-01`
    const end = `${year + 1}-01-01`

    const { data, error } = await supabase
      .from('periods')
      .select('*')
      .gte('start_at', start)
      .lt('start_at', end)

    if (error) throw error
    
    return data
  } catch (error) {
    console.error(error)
    return error
  }
}

/**
 * Creates a new period in the `periods` table.
 *
 * @param {Object} period - Period data.
 * @param {string|Date} period.start_at - Start date.
 * @param {string|Date} period.end_at - End date.
 * @param {boolean} period.isActive - Whether the period is active.
 * @param {string} period.name - Period name.
 * @returns {Promise<Object[]>} The inserted period record(s).
 * @throws {Error} If the insert fails.
 */
export const createPeriod = async (period) => {
    try {
        const { data, error } = await supabase
        .from('periods')
        .insert([
            { start_at: period.start_at, end_at: period.end_at, isActive: period.isActive, name: period.name }
        ])
        .select()

        if(error) throw error
        
        return data
    } catch(error){
        return error
    }
}