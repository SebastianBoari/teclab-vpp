import { useState, useMemo, useEffect } from 'react'
import { AuthContext } from './auth.context'
import { useSession, useUser } from '../hooks/useAuth'
import Spinner from '@components/Spinner'
import { notify } from '@utils/notify.utils'
import { useNavigate } from 'react-router'
import supabase from '@common/lib/supabase'

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null)
  const [user, setUser] = useState(null)
  const [isInitializing, setIsInitializing] = useState(true)
  const navigate = useNavigate()

  const { 
    data: activeSession, 
    isLoading: isSessionLoading, 
    isError: isSessionError, 
    error: activeSessionError 
  } = useSession()
  
  const { 
    data: currentUser, 
    isLoading: isUserLoading, 
    isError: isUserError,
    error: userError 
  } = useUser()

  useEffect(() => {
    if(!activeSession){
      setSession(null)
      setUser(null)
    }
    setSession(activeSession)
  }, [activeSession])

  useEffect(() => {
    if(!currentUser) setUser(null)
    setUser(currentUser)
  }, [currentUser])

  useEffect(() => {
    if (!isSessionLoading && !isUserLoading) {
      setIsInitializing(false)
    }
  }, [isSessionLoading, isUserLoading])
  
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {   
        console.log('Auth state changed:', event)

        if (event === 'SIGNED_IN') {
          setSession(session)
          navigate('/admin')
        } else if (event === 'SIGNED_OUT') {
          setSession(null)
          setUser(null)
          navigate('/login')
        } else if (event === 'TOKEN_REFRESHED') {
          setSession(session)
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [navigate])

  const value = useMemo(() => ({
    session,
    user,
    isAuthenticated: !!session && !!user,
    isLoading: isSessionLoading || isUserLoading || isInitializing
  }), [session, user, isSessionLoading, isUserLoading, isInitializing])

  if(isSessionLoading) return <Spinner/>

  if (isSessionError) {
    notify('error', activeSessionError?.message 
      ? `Error al obtener la sesión. ${activeSessionError.message}` 
      : 'Error al obtener la sesión.')
  }

  if (isUserError) {
    notify('error', userError?.message 
      ? `Error al obtener usuario. ${userError.message}` 
      : 'Error al obtener usuario.')
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}