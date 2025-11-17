import { useNavigate } from 'react-router'
import CountdownBanner from '../components/CountdownBanner'
import Button from '@/shared/ui/Button'
import ScheduleIcon from '@/assets/icons/ScheduleIcon'
import { useEnrollmentContext } from '../hooks/useEnrollmentContext'

const WelcomeStep = () => {
  const { activePeriod } = useEnrollmentContext()

  const navigate = useNavigate()

  const handleContinue = () => {
    navigate('/inscripcion/alumno')
  }

  let daysRemaining = null
  if(activePeriod){
    const enrollmentDeadline = new Date(activePeriod.enrollment_close_at)
    const now = new Date()
    const diffMs = enrollmentDeadline - now
    daysRemaining = Math.ceil(diffMs / (1000 * 60 * 60 * 24))
  }

  return (
    <>
      {activePeriod && (
        <CountdownBanner daysRemaining={daysRemaining}/>
      )}

      <main className="grow flex flex-col items-center justify-center p-6 text-center">
        <div className="w-full max-w-md">

          <div className="mb-8 flex justify-center">
            <div className="bg-primary/10 dark:bg-primary/20 p-4 rounded-full">
              <span className="text-primary text-5xl">
                <ScheduleIcon width="48" height="48" />
              </span>
            </div>
          </div>

          <h1 className="text-2xl font-bold mb-2">
            ¡Bienvenido!
          </h1>

          <h2 className="text-lg mb-4">
            Selección de Grupo de Prácticas
          </h2>

          <p className="mb-8">
            A continuación, podrás elegir los días y horarios que más te convengan para realizar tus prácticas. Por favor, revisa las opciones cuidadosamente antes de confirmar tu selección.
          </p>

        </div>
      </main>

      <footer className="w-full max-w-sm mx-auto">
        <Button status={true} message={'Continuar'} onClick={handleContinue}/>
      </footer>
    </>
  )
}

export default WelcomeStep
