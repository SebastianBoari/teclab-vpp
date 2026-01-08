import { useEnrollmentContext } from '../hooks/useEnrollmentContext'
import { GroupDetails } from '@/features/groups'
import Header from '@common/layout/Header'
import { useNavigate } from 'react-router'

const EnrollmentConfirmation = () => {
  const { enrolledGroup, resetFlow } = useEnrollmentContext()

  const navigate = useNavigate()

  const handleBack = () => {
    resetFlow()
    navigate('/inscripcion/alumno')
  } 

  return (
    <div className="grow flex flex-col">
      <Header onBack={handleBack} title={'Mi grupo'} sticky={true} />
      
      <main className="w-full max-w-3xl mx-auto p-4">
        <GroupDetails group={enrolledGroup}/>
      </main>
    </div>
  )
}

export default EnrollmentConfirmation