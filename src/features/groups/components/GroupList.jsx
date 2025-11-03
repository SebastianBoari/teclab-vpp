import React from 'react'
import GroupItem from './GroupItem.jsx'

const GroupList = ({ groups }) => {
  return (
    <main className="p-4 space-y-4">
        {groups && (
          groups.map((group) => (
            group.periods.isActive && (
              <GroupItem key={group.id} group={group} />
            )
          ))
        )}
    </main>
  )
}

export default GroupList