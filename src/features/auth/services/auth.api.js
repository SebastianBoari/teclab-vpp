import supabase from '@common/lib/supabase'

export const loginWithEmail = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  if (error) throw new Error(error.message)
  return data
}

export const logout = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw new Error(error.message)
  return true
}

export const getCurrentSession = async () => {
  const { data: { session }, error } = await supabase.auth.getSession()
  if (error) throw new Error(error.message)
  return session
}