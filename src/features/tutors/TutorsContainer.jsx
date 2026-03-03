import Header from '@common/layout/Header'
import Spinner from '@common/components/Spinner'
import TutorsList from './components/TutorsList'
import AddIcon from '@assets/icons/AddIcon'
import Button from '@common/components/Button'
import useTutors from './hooks/useTutors'
import { Navbar } from '@/features/admin'
import { useNavigate } from 'react-router'

const TutorsContainer = () => {
  const { data: tutors, isLoading, error } = useTutors()
  const navigate = useNavigate()

  if (isLoading)
    return (
      <div className="flex justify-center min-h-screen">
        <Spinner />
      </div>
    )
  if (error)
    return (
      <div className="flex justify-center min-h-screen">
        <p>Error al cargar tutores.</p>
      </div>
    )
  if (!tutors?.length)
    return (
      <div className="flex justify-center min-h-screen">
        <p>No hay tutores disponibles.</p>
      </div>
    )

  return (
    <section className="flex flex-col gap-4">
      <Header title="Tutores" />
      <div className="mb-24 flex flex-col items-center">
        <TutorsList tutors={tutors} />
      </div>
      <div className="flex flex-col items-center fixed bottom-13 right-0 p-6">
        <Button
          onClick={() => navigate('/admin/tutores/crear')}
          message="Agregar tutor"
          icon={<AddIcon />}
          className="rounded-xl"
        />
      </div>
      <footer>
        <Navbar />
      </footer>
    </section>
  )
}
export default TutorsContainer
