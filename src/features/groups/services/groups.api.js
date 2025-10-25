import supabase from '@/utils/supabase.js'

export async function fetchGroups() {
  const { data, error } = await supabase
  .from('groups')
  .select('*')
  .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function fetchGroupById(id) {
  const { data, error } = await supabase
  .from('groups')
  .select('*')
  .eq('id', id)
  .single()

  if (error) throw error
  return data
}

export async function createGroup(newGroup) {
  const { data, error } = await supabase
  .from('groups')
  .insert([newGroup])
  .select()
  .single()

  if (error) throw error
  return data
}

export async function updateGroup(id, updates) {
  const { data, error } = await supabase
  .from('groups')
  .update(updates)
  .eq('id', id)
  .select()
  .single()

  if (error) throw error
  return data
}
