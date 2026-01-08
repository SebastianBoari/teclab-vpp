import supabase from '@common/lib/supabase'

export const getGroups = async ({ periodId, careerId } = {}) => {
  try {
    let query = supabase
      .from('groups')
      .select(`
        *,
        tutors ( first_name, last_name, avatar_url ), 
        periods!inner ( id, name, start_at, end_at )
      `)
      .order('created_at', { ascending: true })

    if (periodId) query = query.eq('period_id', periodId)  
    if (careerId) query = query.contains('eligible_careers', [careerId])

    const { data, error } = await query

    if (error) throw error

    return data ?? []
  } catch (error) {
    console.error('[getGroups]', error)
    throw error
  }
}

export const getGroup = async ({ id } = {}) => {
  try {
    if (!id) return null

    const { data, error } = await supabase
      .from('groups')
      .select(`
        *,
        tutors ( first_name, last_name, avatar_url ),
        periods ( name, start_at, end_at )
      `)
      .eq('id', id)
      .maybeSingle()

    if (error) throw error
    
    return data ?? null
  } catch (error) {
    console.error('[getGroup]', error)
    throw error
  }
}