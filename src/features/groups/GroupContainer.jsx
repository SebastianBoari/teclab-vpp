import React from 'react'
import { useGroups } from './hooks/useGroups.js'
import GroupList from './components/GroupList.jsx'

const GroupContainer = () => {
  const { groups, loading, error, refetch } = useGroups()
  
  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-8">
      <GroupList groups={groups} />
    </section>
  )
}

export default GroupContainer