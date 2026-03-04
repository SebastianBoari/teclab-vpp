import DeleteIcon from '@assets/icons/DeleteIcon'
import EditIcon from '@assets/icons/EditIcon'
import { useNavigate } from 'react-router'

const StudentsItem = ({ student, onDelete }) => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-1 p-4 rounded-xl max-w-2xl min-w-2xs border transition-all bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <p className="text-base font-bold leading-none text-slate-900 dark:text-white">
            {student.last_name}, {student.first_name}
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            DNI: {student.dni} | {student.careers?.name}
          </p>
          {student.email && <p className="text-xs text-slate-400 mt-1">{student.email}</p>}
        </div>

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
      </div>
    </div>
  )
}
export default StudentsItem
