import supabase from '@/utils/supabase.js'

// Gets all enrollments in a specific group
export const getEnrollmentsByGroup = async (groupId) => {
  const { data, error } = await supabase
    .from('enrollments')
    .select(`
      id,
      created_at,
      group_id:groups(*),
      student_id:students(*),
      period_id:periods(*),
    `)
    .eq('group_id', groupId)

  if (error) throw error

  return data
}

// Gets a specific student's enrollment
export const getEnrollmentForStudent = async (studentId) => {
    const { data, error } = await supabase
    .from('enrollments')
    .select(`
      id,
      created_at,
      group_id:groups(*),
      student_id:students(*),
      period_id:periods(*),
    `)
    .eq('student_id', studentId)

    if(error) throw error

    return data
}

// Gets all enrollments in a specific period
// const getEnrollmentsByPeriod = async () => {
//   try{

//   } catch(err){
//     return err.message ? err : 'Error: getEnrollmentsByPeriod'
//   }
// }

// // Changes a student's group in an existing enrollment
// export const updateEnrollmentGroup = async (enrollmentId, newGroupId) => {}

// // Assigns a group to a student without a prior enrollment
// export const enrollStudent = async (studentId, groupId) => {}