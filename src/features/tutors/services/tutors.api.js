import supabase from '@common/lib/supabase'

export const getTutor = async ({ id }) => {
  const { data, error } = await supabase
    .from('tutors')
    .select('*, careers(name)')
    .eq('id', id)
    .single()
  if (error) throw error
  return data
}

export const getTutors = async () => {
  const { data, error } = await supabase
    .from('tutors')
    .select('*, careers(name)')
    .order('first_name')
  if (error) throw error
  return data ?? []
}

export const createTutor = async (tutorData) => {
  const { data, error } = await supabase.from('tutors').insert(tutorData).select().single()
  if (error) throw error
  return data
}

export const updateTutor = async ({ id, ...updates }) => {
  const { data, error } = await supabase
    .from('tutors')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export const deleteTutor = async (id) => {
  const { error } = await supabase.from('tutors').delete().eq('id', id)
  if (error) {
    if (error.code === '23503') throw new Error('El tutor tiene datos asociados.')
    throw error
  }
  return true
}
