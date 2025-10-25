import React from 'react'
import { useGroups } from '@/features/groups/hooks/useGroups.js'
import GroupList from '@/features/groups/components/GroupList.jsx'

const GroupContainer = () => {
  const { groups, loading, error, refetch } = useGroups()

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-gray-500 animate-pulse">Cargando grupos...</p>
      </div>
    )
  }

  if (!groups || groups.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <p className="text-gray-400">No hay grupos disponibles</p>
      </div>
    )
  }

  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-6 text-center">
        Selecciona un grupo
      </h1>

      <GroupList groups={groups} />
    </section>
  )
}

export default GroupContainer