import { useNavigate, useLocation } from 'react-router'
import HomeIcon from '@assets/icons/HomeIcon'
import ReportsIcon from '@assets/icons/ReportsIcon'
import SettingsIcon from '@assets/icons/SettingsIcon'

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const onNavigate = (path) => {
    navigate(path)
  }

  const isActive = (path) => {
    return location.pathname === path
  }

  const getItemClasses = (path) => {
    const baseClasses = 'flex flex-col items-center justify-center gap-1 w-full h-full cursor-pointer transition-colors'
    const activeClasses = 'text-primary font-bold bg-primary/5 dark:bg-primary/10'
    const inactiveClasses = 'text-slate-500 dark:text-slate-400 font-medium hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'

    return `${baseClasses} ${isActive(path) ? activeClasses : inactiveClasses}`
  }

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white/80 dark:bg-slate-950/95 backdrop-blur-sm border-t border-slate-200 dark:border-slate-800 z-50 pb-safe-area">
      <ul className="flex justify-around items-center h-16 text-[10px] leading-normal">
        
        <li
          className={getItemClasses('/admin')}
          onClick={() => onNavigate('/admin')}>
          <HomeIcon className="text-[28px] mb-0.5" />
          Inicio
        </li>

        <li
          className={getItemClasses('/admin/reportes')}>
          <ReportsIcon className="text-[28px] mb-0.5" />
          Reportes
        </li>

        <li
          className={getItemClasses('/admin/ajustes')}
          onClick={() => onNavigate('/admin/ajustes')}>
          <SettingsIcon className="text-[28px] mb-0.5" />
          Ajustes
        </li>

      </ul>
    </nav>
  )
}

export default Navbar