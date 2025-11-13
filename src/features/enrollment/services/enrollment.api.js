import supabase from '@/utils/supabase.js'

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
    // TODO: Quit console.log in production
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