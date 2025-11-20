import supabase from '@common/lib/supabase'

export const loginWithEmail = async ({ email, password }) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw new Error(error.message)
    
    return data ?? null
  } catch (err) {
    console.error('Unexpected error in loginWithEmail:', err)
    throw err
  }
}

export const logout = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    
    if (error) throw new Error(error.message)
    
    return true
  } catch (err) {
    console.error('Unexpected error in logout:', err)
    throw err
  }
}

export const getCurrentSession = async () => {
  try {
    const { data: { session }, error } = await supabase.auth.getSession()

    if (error) throw new Error(error.message)

    return session ?? null
  } catch (err) {
    console.error('Unexpected error in getCurrentSession:', err)
  throw err
  }
}

export const getCurrentUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error) throw new Error(error.message)

    console.log('User on getCurrentUser: ' + user)

    return user ?? null
  } catch (err) {
    console.error('Unexpected error in getCurrentUser:', err)
    throw err
  }
}