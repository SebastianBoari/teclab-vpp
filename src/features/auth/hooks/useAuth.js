import { useMutation } from '@tanstack/react-query'
import { loginWithEmail, logout } from '../services/auth.api.js'

export const useLogin = () => {
  return useMutation({
    mutationFn: loginWithEmail,
  })
}

export const useLogout = () => {
  return useMutation({
    mutationFn: logout,
  })
}