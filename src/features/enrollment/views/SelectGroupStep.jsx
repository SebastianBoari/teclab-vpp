import React from 'react'
import Header from '@/components/Header' 
import { useNavigate } from 'react-router'
import { GroupContainer } from '@/features/groups'

const SelectGroup = () => {
  const navigate = useNavigate()
  const handleBack = () => {
    navigate('/inscripcion/alumno')
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
        <div className='flex flex-col min-h-screen p-6'>
            <div className="flex-grow">
                <Header onBack={handleBack} sticky={true} title={'Selección de grupo'}/>

                <GroupContainer/>
            </div>
        </div>
    </div>
  )
}

export default SelectGroup