import GroupItem from './GroupItem.jsx'

const GroupList = ({ groups }) => {
  return (
    <main className="space-y-4">
      {groups.map((group) => (
        <GroupItem key={group.id} group={group} />
      ))}
    </main>
  )
}

export default GroupList