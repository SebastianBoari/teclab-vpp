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
    console.error('Unexpected error in enrollStudent:', err)
    throw err
  }
}