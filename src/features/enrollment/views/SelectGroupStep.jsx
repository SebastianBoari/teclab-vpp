import { useNavigate } from 'react-router'
import Header from '@common/layout/Header'
import { GroupsContainer } from '@/features/groups'
import { useEnrollmentContext } from '../hooks/useEnrollmentContext'
import EnrollmentButton from '../components/EnrollmentButton'
import Spinner from '@common/components/Spinner'
const SelectGroup = () => {
  const navigate = useNavigate()

  const { studentData, openPeriod, resetFlow } = useEnrollmentContext()

  const prevStep = () => {
    resetFlow()
    navigate('/inscripcion/alumno')
  }

  if (!studentData || !openPeriod) return

  return (
    <div className="grow flex flex-col">
      <Header onBack={prevStep} sticky={true} title={'Selección de grupo'} />

      <main className="w-full max-w-3xl mx-auto p-4 pb-20">
        <GroupsContainer
          filters={{ careerId: studentData.career_id, periodId: openPeriod?.id }}
          emptyMessage="No hay grupos disponibles para tu carrera en este período."
          renderAction={(group) => <EnrollmentButton group={group} />}
        />
      </main>
    </div>
  )
}

export default SelectGroup
