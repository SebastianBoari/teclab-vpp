import DeleteIcon from '@assets/icons/DeleteIcon'
import EditIcon from '@assets/icons/EditIcon'
import { useNavigate } from 'react-router'

const TutorsItem = ({ tutor, onDelete }) => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-row items-center justify-between gap-3 p-4 rounded-xl max-w-2xl min-w-2xs border transition-all bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex flex-col">
        <p className="text-base font-bold leading-none text-slate-900 dark:text-white">
          {tutor.first_name} {tutor.last_name}
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          {tutor.careers?.name || 'Sin carrera asignada'}
        </p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => navigate(`/admin/tutores/${tutor.id}`)}
          className="p-2 rounded-lg transition-colors text-primary hover:bg-primary/10 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">
            <EditIcon />
          </span>
        </button>
        <button
          onClick={() => onDelete(tutor.id)}
          className="p-2 rounded-lg transition-colors text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">
            <DeleteIcon />
          </span>
        </button>
      </div>
    </div>
  )
}
export default TutorsItem
