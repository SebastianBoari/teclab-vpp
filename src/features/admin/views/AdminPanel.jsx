import Header from '@common/layout/Header'
import CalendarIcon from '@assets/icons/CalendarIcon'
import GroupIcon from '@assets/icons/GroupIcon'
import StudentIcon from '@assets/icons/StudentIcon'
import SupervisorIcon from '@assets/icons/SupervisorIcon'
import TreeIcon from '@assets/icons/TreeIcon'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router'

const AdminPanel = () => {
  const navigate = useNavigate()

  const handlePeriodsClick = () => {
    navigate('/admin/periodos')
  }

  const handleCareersClick = () => {
    navigate('/admin/carreras')
  }

  const handleTutorsClick = () => {
    navigate('/admin/tutores')
  }

  const handleStudentsClick = () => {
    navigate('/admin/alumnos')
  }

  return (
    <section>
      <Header title="Panel de Administración" sticky={true} />

      <div className="bg-slate-50 dark:bg-slate-900 flex flex-col text-slate-900 dark:text-slate-100 font-sans">
        <main className="flex-1 overflow-y-auto pb-24">
          <section className="px-4 max-w-md mx-auto w-full">
            <div className="grid grid-cols-2 gap-4">
              <button
                className="flex flex-col items-center justify-center gap-4 bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 hover:scale-[0.98] transition-transform active:bg-slate-50 dark:active:bg-slate-800 aspect-square cursor-pointer"
                onClick={handlePeriodsClick}
              >
                <div className="size-14 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-3xl">
                    <CalendarIcon />
                  </span>
                </div>
                <span className="font-bold text-slate-800 dark:text-white text-sm">Periodos</span>
              </button>

              <button className="flex flex-col items-center justify-center gap-4 bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 hover:scale-[0.98] transition-transform active:bg-slate-50 dark:active:bg-slate-800 aspect-square cursor-pointer">
                <div className="size-14 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center">
                  <span className="material-symbols-outlined text-emerald-600 text-3xl">
                    <GroupIcon />
                  </span>
                </div>
                <span className="font-bold text-slate-800 dark:text-white text-sm">Grupos</span>
              </button>

              <button
                className="flex flex-col items-center justify-center gap-4 bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 hover:scale-[0.98] transition-transform active:bg-slate-50 dark:active:bg-slate-800 aspect-square  cursor-pointer"
                onClick={handleStudentsClick}
              >
                <div className="size-14 rounded-full bg-orange-50 dark:bg-orange-900/30 flex items-center justify-center">
                  <span className="material-symbols-outlined text-orange-600 text-3xl">
                    <StudentIcon />
                  </span>
                </div>
                <span className="font-bold text-slate-800 dark:text-white text-sm">Alumnos</span>
              </button>

              <button
                className="flex flex-col items-center justify-center gap-4 bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 hover:scale-[0.98] transition-transform active:bg-slate-50 dark:active:bg-slate-800 aspect-square cursor-pointer"
                onClick={handleTutorsClick}
              >
                <div className="size-14 rounded-full bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center">
                  <span className="material-symbols-outlined text-purple-600 text-3xl">
                    <SupervisorIcon />
                  </span>
                </div>
                <span className="font-bold text-slate-800 dark:text-white text-sm">Tutores</span>
              </button>

              <button
                className="flex flex-col items-center justify-center gap-4 bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 hover:scale-[0.98] transition-transform active:bg-slate-50 dark:active:bg-slate-800 aspect-square cursor-pointer"
                onClick={handleCareersClick}
              >
                <div className="size-14 rounded-full bg-rose-50 dark:bg-rose-900/30 flex items-center justify-center">
                  <span className="material-symbols-outlined text-rose-600 text-3xl">
                    <TreeIcon />
                  </span>
                </div>
                <span className="font-bold text-slate-800 dark:text-white text-sm">Carreras</span>
              </button>
            </div>
          </section>
        </main>
      </div>

      <footer className="mt-4">
        <Navbar />
      </footer>
    </section>
  )
}

export default AdminPanel
