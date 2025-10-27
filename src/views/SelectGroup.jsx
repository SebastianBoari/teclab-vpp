import React from 'react'
import Header from '@/components/Header' 
import { GroupContainer } from '@/features/groups'

const SelectGroup = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900">
        <div className='flex flex-col min-h-screen p-6'>

            <div className="flex-grow">
                <Header onBack={()=> {console.log('test')}} sticky={true} title={'Selección de grupo'}/>

                <GroupContainer/>
            </div>
        </div>
    </div>
  )
}

export default SelectGroup