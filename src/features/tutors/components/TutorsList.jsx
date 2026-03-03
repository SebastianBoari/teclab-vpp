import TutorsItem from './TutorsItem'
import useTutorMutations from '../hooks/useTutorMutations'

const TutorsList = ({ tutors }) => {
  const { deleteTutor } = useTutorMutations()

  return (
    <main className="space-y-4">
      {tutors.map((tutor) => (
        <TutorsItem key={tutor.id} tutor={tutor} onDelete={(id) => deleteTutor.mutate(id)} />
      ))}
    </main>
  )
}
export default TutorsList
