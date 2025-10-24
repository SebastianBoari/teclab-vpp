import React from 'react'
import Group from '@/components/Group'

// Contenedor que hace el fetch y renderiza una lista de grupos
const GroupList = () => {
  return (
    <main className="p-4 space-y-4">
        <Group/>

        <Group/>

        <Group/>

        <Group/>
    </main>
  )
}

export default GroupList