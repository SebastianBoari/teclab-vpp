import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { loginWithEmail, logout, getCurrentSession, getCurrentUser } from '../services/auth.api.js'

export const useLogin = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: loginWithEmail,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['session'] })
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
  })
}

export const useLogout = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.setQueryData(['session'], null)
      queryClient.setQueryData(['user'], null)
    },
  })
}

export const useSession = () => {
  return useQuery({
    queryKey: ['session'],
    queryFn: getCurrentSession,
    staleTime: 1000 * 60 * 5, // 5 minutos
  })
}

export const useUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
    staleTime: 1000 * 60 * 5, // 5 minutos
  })
}