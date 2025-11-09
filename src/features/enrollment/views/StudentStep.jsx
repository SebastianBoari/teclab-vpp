import { useNavigate } from 'react-router'
import Header from '@/components/Header'
import Button from '@/components/Button'
import { useEnrollmentContext } from '../context/useEnrollmentContext.js'

const DNI_REGEX = /^\d{7,8}$/

const StudentStep = () => {
  const { dni, setDni } = useEnrollmentContext()
  const isDniValid = DNI_REGEX.test(dni)
  
  let navigate = useNavigate()
  
  const nextStep = () => {
    navigate('/inscripcion/grupos')
  }

  const prevStep = () => {
    navigate('/inscripcion')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!isDniValid) return 
    nextStep()
  }

  return (
    <div className="text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col min-h-screen justify-between p-6">
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
                onChange={(e) => setDni(e.target.value)}
                type="tel"
                inputMode="numeric"
                placeholder="Ej. 28456789"
                className="w-full px-4 py-4 text-center bg-gray-100 dark:bg-gray-800 border-2 border-transparent rounded-lg text-gray-900 dark:text-white transition duration-200 focus:border-primary focus:outline-none focus:ring-0"
              />
            </div>
          </div>
        </form>

        <footer className="w-full max-w-sm mx-auto">
          <Button disabled={!isDniValid} message={'Continuar'} type={'submit'} form={'dni-form'}/>
        </footer>
      </div>
    </div>
  )
}

export default StudentStep