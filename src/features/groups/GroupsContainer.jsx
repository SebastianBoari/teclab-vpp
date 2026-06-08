import GroupList from './components/GroupList.jsx'
import useGroups from './hooks/useGroups.js'
import Spinner from '@common/components/Spinner'

const GroupsContainer = ({
  filters = {},
  emptyMessage = 'No se encontraron grupos.',
  renderAction,
}) => {
  const { data: groups, isLoading, error } = useGroups(filters)

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
        <button onClick={() => window.location.reload()} className="underline mt-2">
          Reintentar
        </button>
      </div>
    )
  }

  if (!groups || groups.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        <p>{emptyMessage}</p>
      </div>
    )
  }

  return (
    <section className="w-full">
      <GroupList groups={groups} renderAction={renderAction} />
    </section>
  )
}

export default GroupsContainer
