import GroupItem from './GroupItem.jsx'

const GroupList = ({ groups, renderAction }) => {
  return (
    <main className="space-y-4">
      {groups.map((group) => (
        <GroupItem key={group.id} group={group} renderAction={renderAction} />
      ))}
    </main>
  )
}

export default GroupList
