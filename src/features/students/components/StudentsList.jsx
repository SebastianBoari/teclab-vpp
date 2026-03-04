import StudentsItem from './StudentsItem'
import useStudentsMutations from '../hooks/useStudentsMutations'

const StudentsList = ({ students }) => {
  const { deleteStudent } = useStudentsMutations()

  return (
    <main className="space-y-4">
      {students.map((student) => (
        <StudentsItem
          key={student.id}
          student={student}
          onDelete={(id) => deleteStudent.mutate(id)}
        />
      ))}
    </main>
  )
}
export default StudentsList
