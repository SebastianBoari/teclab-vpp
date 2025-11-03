import GroupList from './components/GroupList.jsx'
import useGroups from './hooks/useGroups.js'

const GroupContainer = () => {
  const { groups, loading, error } = useGroups()

  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-8">
      <GroupList groups={groups} />
    </section>
  )
}

export default GroupContainer