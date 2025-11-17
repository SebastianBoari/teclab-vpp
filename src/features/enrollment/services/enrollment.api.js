import supabase from '@/shared/lib/supabase'

export const createEnrollment = async (studentId, groupId) => {
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

    if (error) throw new Error(error.message)
    
    return data?.[0] ?? null
  } catch (err) {
    console.error('Unexpected error in createEnrollment:', err)
    throw err
  }
}

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
    const { data: enrolledGroup, error } = await supabase
      .from('groups')
      .select(`
        *, 
        enrollments!inner(student_id)
      `)
      .eq('period_id', periodId)
      .eq('enrollments.student_id', studentId)
      .single()

    if (error) {
      if (error.code === 'PGRST116') return null
      throw error
    }
    return enrolledGroup
  } catch (err) {
    console.error('Unexpected error in getEnrolledGroup:', err)
    throw err
  }
}