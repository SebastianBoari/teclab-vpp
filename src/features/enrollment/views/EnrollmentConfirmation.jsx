import { useEnrollmentContext } from '../context/useEnrollmentContext.js'

const EnrollmentConfirmation = () => {
  const { studentData, selectedGroup } = useEnrollmentContext()
  
  const {
    group_name,
    category,
  } = selectedGroup

  return (
    <div>
      <h1>Hola, {studentData.first_name}👋</h1>
      <h2>Ya estás inscripto/a a un grupo.</h2>

      <div>
          <header>
            <h3>Grupo {group_name} {category.toUpperCase()}</h3>
            
          </header>
      </div>

    </div>
  )
}

export default EnrollmentConfirmation