import DeleteIcon from '@assets/icons/DeleteIcon'
import EditIcon from '@assets/icons/EditIcon'
import { useNavigate } from 'react-router'

const StudentsItem = ({ student, index, onDelete }) => {
  const navigate = useNavigate()

  if (student.careers?.name.includes('Técnico Superior')) {
    const careerName = student.careers.name.split('Técnico Superior en')[1]
    student.careers.name = `${careerName}`
  }

  if (student.careers?.name.includes('Tecnico Superior')) {
    const careerName = student.careers.name.split('Tecnico Superior en')[1]
    student.careers.name = `${careerName}`
  }

  const rowBg = index % 2 === 0 ? 'bg-white' : 'bg-slate-100'

  return (
    <tr>
      <td className={`px-4 py-2 text-sm text-slate-700 font-medium ${rowBg}`}>{student.dni}</td>
      <td className={`px-4 py-2 text-sm text-slate-700 font-medium ${rowBg}`}>
        {student.first_name} {student.last_name}
      </td>
      <td className={`px-4 py-2 text-sm text-slate-700 font-medium ${rowBg}`}>
        {student.careers?.name}
      </td>
      <td className={`px-4 py-2 text-sm text-slate-700 font-medium ${rowBg}`}>
        {student.number ? student.number : 'N/A'}
      </td>
      <td className={`px-4 py-2 text-sm text-slate-700 font-medium ${rowBg}`}>
        {student.email ? student.email : 'N/A'}
      </td>
      <td className={`px-4 py-2 text-sm text-slate-700 font-medium ${rowBg}`}>
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/admin/alumnos/${student.id}`)}
            className="p-2 rounded-lg transition-colors text-primary hover:bg-primary/10 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">
              <EditIcon />
            </span>
          </button>
          <button
            onClick={() => onDelete(student.id)}
            className="p-2 rounded-lg transition-colors text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">
              <DeleteIcon />
            </span>
          </button>
        </div>
      </td>
    </tr>
  )
}
export default StudentsItem
