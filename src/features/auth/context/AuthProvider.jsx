import { useState, useMemo, useEffect } from 'react'
import { AuthContext } from './auth.context'
import { useSession } from '../hooks/useAuth'
import Spinner from '@/shared/ui/Spinner'

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null)
  const [user, setUser] = useState(null)

  const { 
    data: activeSession, 
    isLoading: isActiveSessionLoading, 
    isError: isActiveSessionError, 
    error: activeSessionError 
  } = useSession()
  
  useEffect(() => {
    setSession(activeSession ?? null)
  }, [activeSession])
  
  const value = useMemo(() => ({
    session,
    user,
    setUser
  }), [session, user])

  if(isActiveSessionLoading) return <Spinner/>

  if(isActiveSessionError){
    return (
      <>
        <h1>Error al obtener la sesion.</h1>
        <p>{activeSessionError.message}</p>
      </>
    )
  }
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}