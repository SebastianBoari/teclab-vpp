import GroupList from './components/GroupList.jsx'
import useEligibleGroups from './hooks/useEligibleGroups.js'

const GroupContainer = ({ studentId, studentCareerId }) => {
  const { eligibleGroups, loading, error } = useEligibleGroups(studentCareerId)

  // TODO: Mejorar la vista y la lógica de carga y error
  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-8">
      <GroupList studentId={studentId} groups={eligibleGroups} />

      {loading && <p className="text-center text-gray-500">Cargando...</p>}

      {error && <p className="text-center text-gray-500">Error: no se han encontrado grupos disponibles.</p>}
    </section>
  )
}

export default GroupContainer