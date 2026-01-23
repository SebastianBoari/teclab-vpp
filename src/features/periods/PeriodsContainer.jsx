import Header from '@common/layout/Header'
import Spinner from '@common/components/Spinner'
import PeriodList from './components/PeriodList'
import CreatePeriodButton from './components/CreatePeriodButton'
import usePeriods from './hooks/usePeriods'
import { Navbar } from '@/features/admin'

const PeriodContainer = () => {
  const { data: periods, isLoading, error } = usePeriods()

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
          <p>Error al cargar los periodos. Por favor intenta más tarde.</p>
        </div>
      </div>
    )
  }

  if(periods.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="flex h-screen items-center justify-center">
          <p>No hay periodos disponibles.</p>
        </div>
      </div>
    )
  }

  return (
    <section className='flex flex-col gap-4'>
      <Header title="Periodos"/>

      <div className='mb-24 flex flex-col items-center'>
        <PeriodList periods={periods}/>
      </div>
      
      <div className='flex flex-col items-center fixed bottom-13 right-0 p-6'>
       <CreatePeriodButton />
      </div>

      <footer>
        <Navbar/>
      </footer>
    </section>
  )
}

export default PeriodContainer