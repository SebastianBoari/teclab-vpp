import Header from '@common/layout/Header'
import Spinner from '@common/components/Spinner'
import StudentsList from './components/StudentsList'
import AddIcon from '@assets/icons/AddIcon'
import Button from '@common/components/Button'
import useStudents from './hooks/useStudents'
import { Navbar } from '@/features/admin'
import { useNavigate } from 'react-router'

const StudentsContainer = () => {
  const { data: students, isLoading, error } = useStudents()
  const navigate = useNavigate()

  const handleNavigate = () => navigate('/admin/alumnos/crear')

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-900">
        <Spinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-900">
        <p className="text-slate-900 dark:text-white">
          Error al cargar los alumnos. Intenta más tarde.
        </p>
      </div>
    )
  }

  return (
    <section className="flex flex-col gap-4 bg-slate-50 dark:bg-slate-900 min-h-screen">
      <Header title="Alumnos" />

      <div className="mb-24 flex flex-col px-4">
        {students?.length === 0 ? (
          <div className="flex justify-center mt-10">
            <p className="text-slate-500">No hay alumnos disponibles.</p>
          </div>
        ) : (
          <StudentsList students={students} />
        )}
      </div>

      <div className="flex flex-col items-center fixed bottom-20 right-0 p-6 z-10">
        <Button
          onClick={handleNavigate}
          message="Añadir alumno"
          icon={<AddIcon />}
          className="rounded-xl shadow-lg"
        />
      </div>

      <footer>
        <Navbar />
      </footer>
    </section>
  )
}

export default StudentsContainer
