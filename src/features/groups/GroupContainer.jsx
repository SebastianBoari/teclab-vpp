import GroupList from './components/GroupList.jsx'
import useEligibleGroups from './hooks/useEligibleGroups.js'

const GroupContainer = ({ studentCareerId }) => {
  const { eligibleGroups, loading, error } = useEligibleGroups(studentCareerId)

  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-8">
      <GroupList groups={eligibleGroups} />
    </section>
  )
}

export default GroupContainer