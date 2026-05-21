import StudentsItem from './StudentsItem'
import useStudentsMutations from '../hooks/useStudentsMutations'
import SearchIcon from '@assets/icons/SearchIcon'
import AddUserIcon from '@assets/icons/AddUserIcon'
import AddPeopleIcon from '@assets/icons/AddPeopleIcon'

const StudentsList = ({ students }) => {
  const { deleteStudent } = useStudentsMutations()

  return (
    <main className="grid place-items-center">
      <div>
        <table className="text-center align-middle rounded-lg overflow-hidden">
          <thead className="border-b border-slate-200">
            <tr>
              <th className="px-4 py-2 text-base bg-slate-100 text-slate-700">DNI</th>
              <th className="px-4 py-2 text-base bg-slate-100 text-slate-700">Nombre completo</th>
              <th className="px-4 py-2 text-base bg-slate-100 text-slate-700">Carrera</th>
              <th className="px-4 py-2 text-base bg-slate-100 text-slate-700">Número</th>
              <th className="px-4 py-2 text-base bg-slate-100 text-slate-700">Email</th>
              <th className="px-4 py-2 text-base bg-slate-100 text-slate-700">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student, index) => (
              <StudentsItem
                key={student.id}
                student={student}
                index={index}
                onDelete={(id) => deleteStudent.mutate(id)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}
export default StudentsList
