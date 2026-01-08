import { useState } from 'react'
import { useNavigate } from 'react-router'
import Header from '@common/layout/Header'
import Button from '@components/Button'
import { useEnrollmentContext } from '../hooks/useEnrollmentContext'
import { notify } from '@utils/notify.utils'

const DNI_REGEX = /^\d{7,8}$/

const StudentStep = () => {
  const navigate = useNavigate()
  const [dni, setDni] = useState('')
  const isDniValid = DNI_REGEX.test(dni)

  const { identifyStudent, isLoading, resetFlow } = useEnrollmentContext()

  const prevStep = () => {
    resetFlow()
    navigate('/inscripcion')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!isDniValid) return

    try {
      const status = await identifyStudent(dni)

      switch (status) {
        case 'ALREADY_ENROLLED':
          navigate('/inscripcion/confirmacion') 
          break
          
        case 'CAN_ENROLL':
          navigate('/inscripcion/grupos') 
          break
          
        case 'PERIOD_CLOSED':
          notify('info', 'El periodo de inscripción ha finalizado y no tienes un grupo asignado.')
          break
          
        default:
          console.warn('Estado desconocido:', status)
      }

    } catch (error) {
      if (error.message === 'DNI_NOT_FOUND') {
        notify('error', 'El DNI ingresado no corresponde a un alumno registrado.')
      } else {
        notify('error', 'Ocurrió un error inesperado. Intente nuevamente.')
      }
    }
  }

  return (
    <>
      <Header onBack={prevStep}/>

      <form onSubmit={handleSubmit} id="dni-form" className="flex flex-col items-center text-center grow justify-center">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Ingresa tu DNI
          </h1>

          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Para continuar, por favor ingresa tu número de documento sin espacios, comas o puntos.
          </p>

          <div className="relative">
            <input
              id="dni-input"
              value={dni}
              onChange={(e) => setDni(e.target.value.replace(/\D/g, ''))}
              type="tel"
              inputMode="numeric"
              placeholder="Ej. 28456789"
              maxLength={8}
              disabled={isLoading}
              className="w-full px-4 py-4 text-center bg-gray-100 dark:bg-gray-800 border-2 border-transparent rounded-lg text-gray-900 dark:text-white transition duration-200 focus:border-primary focus:outline-none focus:ring-0 disabled:opacity-50"
            />
          </div>
        </div>
      </form>

      <footer className="w-full max-w-sm mx-auto pb-6">
        <Button 
          disabled={!isDniValid || isLoading} 
          message={isLoading ? 'Verificando...' : 'Continuar'} 
          type={'submit'} 
          form={'dni-form'}
        />
      </footer>
    </>
  )
}

export default StudentStep