import supabase from '@common/lib/supabase'

export const createEnrollment = async ({ studentId, groupId }) => {
  try {
    const { data, error } = await supabase
      .from('enrollments')
      .insert([
        {
          student_id: studentId,
          group_id: groupId
        }
      ])
      .select()
      .single()

    if (error) throw error
    
    return data
  } catch (error) {
    console.error(`Error en createEnrollment: ${error.message}`, error)
    throw error
  }
}

export const getEnrollment = async ({ id, studentId, periodId } = {}) => {
  try {
    if (!id && !studentId) return null

    let query = supabase
      .from('enrollments')
      .select(`
        *,
        groups!inner (*) 
      `)

    if (id) query = query.eq('id', id)
    
    if (studentId) query = query.eq('student_id', studentId)

    if (periodId) query = query.eq('groups.period_id', periodId)

    const { data, error } = await query.maybeSingle()

    if (error) throw error
    
    return data ?? null
  } catch (error) {
    console.error(`Error en getEnrollment: ${error.message}`, error)
    throw error
  }
}

export const getEnrollments = async ({ studentId, groupId, periodId } = {}) => {
  try {
    let query = supabase
      .from('enrollments')
      .select(`
        *,
        groups!inner (
           id, group_name, category, schedule, period_id
        )
      `)

    if (studentId) query = query.eq('student_id', studentId)
    
    if (groupId) query = query.eq('group_id', groupId)

    if (periodId) query = query.eq('groups.period_id', periodId)

    const { data, error } = await query

    if (error) throw error
    
    return data ?? []
  } catch (error) {
    console.error(`Error en getEnrollments: ${error.message}`, error)
    throw error
  }
}