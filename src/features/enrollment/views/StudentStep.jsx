import { useState } from 'react'
import { useNavigate } from 'react-router'
import Header from '@/components/Header'
import Button from '@/components/Button'
import { useEnrollmentContext } from '../context/useEnrollmentContext'

const DNI_REGEX = /^\d{7,8}$/

const StudentStep = () => {
  const [dni, setDni] = useState('')
  const isDniValid = DNI_REGEX.test(dni)
  const { setStudentDni } = useEnrollmentContext()
  const navigate = useNavigate()

  const prevStep = () => {
    navigate('/inscripcion')
  }

  const nextStep = () => {
    navigate('/inscripcion/grupos')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if(!isDniValid) return
    setStudentDni(dni)
    nextStep()
  }

  return (
    <>
      <Header onBack={prevStep}/>

      <form onSubmit={handleSubmit} id="dni-form" className="flex flex-col items-center text-center">
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
              className="w-full px-4 py-4 text-center bg-gray-100 dark:bg-gray-800 border-2 border-transparent rounded-lg text-gray-900 dark:text-white transition duration-200 focus:border-primary focus:outline-none focus:ring-0"
            />
          </div>
        </div>
      </form>

      <footer className="w-full max-w-sm mx-auto">
        <Button 
          disabled={!isDniValid} 
          message={'Continuar'} 
          type={'submit'} 
          form={'dni-form'}
        />
      </footer>
    </>
  )
}

export default StudentStep