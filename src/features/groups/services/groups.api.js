import supabase from '@/utils/supabase.js'

export async function getGroups() {
  const { data, error } = await supabase
  .from('groups')
  .select(`
    id,
    created_at,
    group_name,
    category,
    periods ( name, isActive, start_at, end_at ),
    capacity,
    link_meet,
    link_whapp,
    link_drive,
    tutors ( first_name, last_name, email ),
    schedule,
    
    eligible_careers

  `)
  .order('created_at', { ascending: true })

  if (error) throw error
  
  return data
}

export async function getGroupById(id) {
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
