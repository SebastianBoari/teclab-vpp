import Header from '@common/layout/Header'
import Spinner from '@common/components/Spinner'
import AddIcon from '@assets/icons/AddIcon'
import Button from '@common/components/Button'
import { Navbar } from '@/features/admin'
import { useNavigate } from 'react-router'
import CareerList from './components/CareerList'
import useCareers from './hooks/useCareers'

const CareersContainer = () => {
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate('/admin/carreras/crear')
  }

  const { data: careers, isLoading, error } = useCareers()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <Spinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="flex h-screen items-center justify-center">
          <p>Error al cargar las carreras. Por favor intenta más tarde.</p>
        </div>
      </div>
    )
  }

  if (careers.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="flex h-screen items-center justify-center">
          <p>No hay carreras disponibles.</p>
        </div>
      </div>
    )
  }

  return (
    <section className="flex flex-col gap-4">
      <Header title="Carreras" />

      <div className="mb-24 flex flex-col items-center">
        <CareerList careers={careers} />
      </div>

      <div className="flex flex-col items-center fixed bottom-13 right-0 p-6">
        <Button
          onClick={handleNavigate}
          message={'Agregar carrera'}
          icon={<AddIcon />}
          className={'rounded-xl'}
        />
      </div>

      <footer>
        <Navbar />
      </footer>
    </section>
  )
}

export default CareersContainer
