import supabase from '@common/lib/supabase'

export const getStudent = async ({ id }) => {
  const { data, error } = await supabase
    .from('students')
    .select('*, careers(name)')
    .eq('id', id)
    .single()
  if (error) throw error
  return data
}

export const getStudents = async () => {
  const { data, error } = await supabase
    .from('students')
    .select('*, careers(name)')
    .order('last_name')
  if (error) throw error
  return data ?? []
}

export const createStudent = async (studentData) => {
  const payload = { ...studentData, email: studentData.email || null }
  const { data, error } = await supabase.from('students').insert(payload).select().single()
  if (error) throw error
  return data
}

export const updateStudent = async ({ id, ...updates }) => {
  const payload = { ...updates, email: updates.email || null }
  const { data, error } = await supabase
    .from('students')
    .update(payload)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export const deleteStudent = async (id) => {
  const { error } = await supabase.from('students').delete().eq('id', id)
  if (error) {
    if (error.code === '23503') throw new Error('El alumno tiene inscripciones o datos asociados.')
    throw error
  }
  return true
}
