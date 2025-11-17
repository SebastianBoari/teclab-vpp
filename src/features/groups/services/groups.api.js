import supabase from '@/shared/lib/supabase'

export const getGroups = async (isActive = null) => {
  try {
    let query = supabase
      .from('groups')
      .select(`
        id,
        created_at,
        group_name,
        category,
        periods!inner ( name, isActive, start_at, end_at ),
        period_id,
        capacity,
        link_meet,
        link_whapp,
        link_drive,
        tutors ( first_name, last_name, email ),
        schedule,
        eligible_careers
      `)
      .order('created_at', { ascending: true })

    if (isActive !== null) query = query.eq('periods.isActive', isActive)

    const { data, error } = await query

    if (error) {
      throw new Error(error.message)
    }

    return data ?? []

  } catch (err) {
    // TODO: Quit console.log in production
    console.error('Unexpected error in getGroups:', err)
    throw err
  }
}
