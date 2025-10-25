import React from 'react'
import GroupItem from '@/features/groups/components/GroupItem.jsx'

// Contenedor que hace el fetch y renderiza una lista de grupos
const GroupList = () => {
  return (
    <main className="p-4 space-y-4">
        <GroupItem/>

        <GroupItem/>

        <GroupItem/>

        <GroupItem/>
    </main>
  )
}

export default GroupList