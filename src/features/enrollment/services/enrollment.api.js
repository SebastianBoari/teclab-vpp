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


// LEGACY
export const getEnrollmentByStudent = async (studentId) => {
  try{
    const { data, error } = await supabase
    .from('enrollments')
    .select('*')
    .eq('student_id', studentId)

    if(error) throw new Error(error.message)
    
    return data ?? null
  } catch (err) {
    console.error('Unexpected error in getEnrollmentByStudentDni:', err)
    throw err
  }
}

export const getEnrolledGroup = async ({ studentId, periodId }) => {
  if (!studentId || !periodId) return null

  try {
    const { data, error } = await supabase
      .from('groups')
      .select(`
        *, 
        enrollments!inner(student_id)
      `)
      .eq('period_id', periodId)
      .eq('enrollments.student_id', studentId)
      .maybeSingle()

    if (error) {
      console.error('Error en getEnrolledGroup:', error)
      throw error
    }

    return data ?? null
  } catch (err) {
    console.error('Unexpected error in getEnrolledGroup:', err)
    throw err
  }
}