import GroupItem from './GroupItem.jsx'

const GroupList = ({ studentId, groups }) => {
  return (
    <main className="p-4 space-y-4">
        {groups && (
          groups.map((group) => (
            <GroupItem key={group.id} group={group} studentId={studentId} />
          ))
        )}
    </main>
  )
}

export default GroupList