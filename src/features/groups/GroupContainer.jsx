import GroupList from './components/GroupList.jsx'
import useGroups from './hooks/useGroups.js'
import Spinner from '@common/components/Spinner'

const GroupContainer = ({ careerId, periodId }) => {
  const { 
    data: groups, 
    isLoading, 
    error 
  } = useGroups({ periodId, careerId })

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        <p>No se pudieron cargar los grupos.</p>
        <button onClick={() => window.location.reload()} className="underline mt-2">Reintentar</button>
      </div>
    )
  }

  if (!groups || groups.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        <p>No hay grupos disponibles para tu carrera en este periodo.</p>
      </div>
    )
  }

  return (
    <section className="w-full">
      <GroupList groups={groups} />
    </section>
  )
}

export default GroupContainer