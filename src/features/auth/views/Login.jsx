import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import Button from '@/shared/ui/Button'
import AlertIcon from '@/assets/icons/AlertIcon'

import { useLogin, useSession } from '../hooks/useAuth'
import { useNavigate } from 'react-router'

const schema = yup.object({
  email: yup
    .string()
    .required('El correo electrónico es obligatorio')
    .email('Debe ser un correo electrónico válido'),
  password: yup
    .string()
    .required('La contraseña es obligatoria')
    .min(6, 'La contraseña debe tener al menos 6 caracteres'),
}).required()

const Login = () => {
  const navigate = useNavigate()
  const { data: session } = useSession()
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ 
    resolver: yupResolver(schema),
    mode: 'onBlur'
  })

  const { 
    mutate: login, 
    isError: isLoginError, 
    error: loginError,
    isPending: isLoginPending
  } = useLogin()

  useEffect(() => {
    if (session) {
      // navigate('/admin', { replace: true })
      console.log('test')
    }
  }, [session, navigate])

  const onSubmit = (data) => login(data)
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50 dark:bg-gray-900 gap-4">
      <div className="w-full max-w-md mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md space-y-6">
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-50 mb-6">
            Hola de nuevo!
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="sr-only" htmlFor="email">
                Correo electrónico
              </label>
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <input
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                    errors.email 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 dark:border-gray-700 focus:ring-blue-500'
                  } bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-50 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:border-transparent outline-none transition-colors`}
                  id="email"
                  placeholder="Correo electrónico"
                  type="email"
                  disabled={isSubmitting || isLoginPending}
                  {...register('email')}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-500 dark:text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="sr-only" htmlFor="password">
                Contraseña
              </label>
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <input
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                    errors.password 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 dark:border-gray-700 focus:ring-blue-500'
                  } bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-50 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:border-transparent outline-none transition-colors`}
                  id="password"
                  placeholder="Contraseña"
                  type="password"
                  disabled={isSubmitting || isLoginPending}
                  {...register('password')}
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500 dark:text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>

            {isLoginError && (
              <div className="flex items-center p-3 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-900/20 dark:text-red-400 gap-4" role="alert">
                <AlertIcon width={48} height={48} className={'text-red-800 dark:text-red-400'}/>

                <p>
                  <span className="font-medium">Error de inicio de sesión.</span>{' '}
                  {loginError?.message === 'Invalid login credentials' 
                    ? 'Correo electrónico o contraseña incorrectos. Por favor, inténtelo de nuevo.'
                    : loginError?.message === 'Email rate limit exceeded'
                    ? 'Demasiados intentos. Por favor, espera unos minutos antes de intentar nuevamente.'
                    : loginError?.message || 'Ha ocurrido un error inesperado. Inténtalo de nuevo más tarde.'}
                </p>
              </div>
            )}

            <Button 
              message={'Iniciar sesión'} 
              type="submit"
              disabled={isSubmitting || isLoginPending}
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login