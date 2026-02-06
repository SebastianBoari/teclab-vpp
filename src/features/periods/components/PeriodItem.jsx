import CalendarIcon from '@assets/icons/CalendarIcon'
import DeleteIcon from '@assets/icons/DeleteIcon'
import EditIcon from '@assets/icons/EditIcon'
import { formatDate } from '@utils/date.utils'

const PeriodItem = ({ period, onEdit, onDelete }) => {
  const { name, start_at, end_at, enrollment_open_at, enrollment_close_at } = period
  const isEnded = new Date(end_at) < new Date()

  const formattedDates = {
    enrollmentOpen: formatDate(enrollment_open_at, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }),
    enrollmentClose: formatDate(enrollment_close_at, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }),
    start: formatDate(start_at),
    end: formatDate(end_at),
    year: formatDate(start_at, { year: 'numeric' }),
  }

  const styles = {
    card: isEnded
      ? 'opacity-80 border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50'
      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm',

    iconBox: isEnded
      ? 'bg-slate-200 dark:bg-slate-800 text-slate-400'
      : 'bg-primary/10 text-primary',

    title: isEnded ? 'text-slate-500 dark:text-slate-400' : 'text-slate-900 dark:text-white',

    actionBtn: isEnded
      ? 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
      : 'text-primary hover:bg-primary/10',

    deleteBtn: isEnded
      ? 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
      : 'text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20',
  }

  return (
    <div
      className={`flex flex-col gap-3 p-4 rounded-xl max-w-2xl min-w-2xs border transition-all ${styles.card}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`flex items-center justify-center rounded-lg shrink-0 size-10 ${styles.iconBox}`}
          >
            <span className="material-symbols-outlined">
              <CalendarIcon />
            </span>
          </div>

          <div className="flex flex-col">
            <p className={`text-base font-bold leading-none ${styles.title}`}>
              {name} {formattedDates.year}
            </p>

            <p className="text-slate-500 dark:text-slate-400 text-xs font-normal mt-1">
              {formattedDates.start} - {formattedDates.end}
            </p>
          </div>
        </div>

        {isEnded && (
          <div className="flex h-6 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 px-2">
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">
              Finalizado
            </p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-3 mt-1">
        <div className="flex flex-col">
          <p className="text-slate-400 dark:text-slate-500 text-[10px] uppercase font-bold tracking-tight">
            Inscripción
          </p>

          {enrollment_open_at && enrollment_close_at && (
            <p
              className={`text-sm font-medium py-2 pr-2 ${isEnded ? 'text-slate-500' : 'text-slate-900 dark:text-slate-200'}`}
            >
              {formattedDates.enrollmentOpen}hs - {formattedDates.enrollmentClose}hs
            </p>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(period.id)}
            className={`p-2 rounded-lg transition-colors ${styles.actionBtn}`}
            title="Editar"
          >
            <span className="material-symbols-outlined text-[20px]">
              <EditIcon />
            </span>
          </button>

          <button
            onClick={() => onDelete(period.id)}
            className={`p-2 rounded-lg transition-colors ${styles.deleteBtn}`}
            title="Eliminar"
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

export default PeriodItem
