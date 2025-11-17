import { useNavigate } from 'react-router'
import NotFoundIcon from '@/assets/icons/NotFoundIcon'
import Button from '@/shared/ui/Button'

const NotFoundPage = () => {
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate('/inscripcion')
    return
  }

  return (
    <div className="relative flex h-screen min-h-[600px] w-full flex-col items-center justify-center overflow-hidden p-4 bg-gray-50 dark:bg-gray-900">
      <div className="flex max-w-sm w-full flex-col items-center gap-8 text-center">

        <div className="flex items-center justify-center">
          <NotFoundIcon 
            width={128} 
            height={128} 
            fill={'#3b82f64d'}
            className="dark:opacity-60"
          />
        </div>

        <div className="flex w-full flex-col items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Página no encontrada
          </h1>

          <p className="text-base font-normal text-gray-600 dark:text-gray-400">
            Parece que el enlace que seguiste está roto o la página ha sido eliminada.
          </p>
        </div>

        <Button message={'Ir al inicio'} onClick={handleGoHome}/>
      </div>
    </div>
  )
}

export default NotFoundPage