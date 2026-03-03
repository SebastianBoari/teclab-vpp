import CareerItem from './CareerItem.jsx'
import useCareerMutations from '../hooks/useCareerMutations.js'

const CareerList = ({ careers }) => {
  const { deleteCareer } = useCareerMutations()

  const onDelete = (careerId) => {
    deleteCareer.mutate(careerId)
  }

  return (
    <main className="space-y-4">
      {careers.map((career) => (
        <CareerItem key={career.id} career={career} onDelete={onDelete} />
      ))}
    </main>
  )
}

export default CareerList
