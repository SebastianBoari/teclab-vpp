import DeleteIcon from '@assets/icons/DeleteIcon'
import EditIcon from '@assets/icons/EditIcon'
import { useNavigate } from 'react-router'

const CareerItem = ({ career, onDelete }) => {
  const navigate = useNavigate()

  const handleEdit = () => {
    navigate(`/admin/carreras/${career.id}`)
  }

  const { name } = career

  return (
    <div className="flex flex-row items-center justify-between gap-3 p-4 rounded-xl max-w-2xl min-w-2xs border transition-all bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm">
      <p className="text-base font-bold leading-none text-slate-900 dark:text-white">{name}</p>

      <div className="flex gap-2">
        <button
          onClick={handleEdit}
          className="p-2 rounded-lg transition-colors text-primary hover:bg-primary/10 cursor-pointer"
          title="Editar"
        >
          <span className="material-symbols-outlined text-[20px]">
            <EditIcon />
          </span>
        </button>

        <button
          onClick={() => onDelete(career.id)}
          className="p-2 rounded-lg transition-colors text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer"
          title="Eliminar"
        >
          <span className="material-symbols-outlined text-[20px]">
            <DeleteIcon />
          </span>
        </button>
      </div>
    </div>
  )
}

export default CareerItem
