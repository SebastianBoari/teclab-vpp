import GroupIcon from '@assets/icons/GroupIcon'
import CreateGroupIcon from '@assets/icons/CreateGroupIcon'
import SettingsIcon from '@assets/icons/SettingsIcon'
import { useNavigate, useLocation } from 'react-router'

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
    const activeClasses = 'text-primary font-bold bg-primary/5'
    const inactiveClasses = 'text-slate-500 font-medium hover:text-slate-700 hover:bg-slate-100'
    
    return `${baseClasses} ${isActive(path) ? activeClasses : inactiveClasses}`
  }

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-sm border-t border-slate-200 z-50">
      <ul className="flex justify-around items-center h-16 text-xs">
        <li 
          className={getItemClasses('/admin/grupos')}
          onClick={() => onNavigate('/admin/grupos')}
        >
          <GroupIcon className="text-2xl mb-0.5" /> 
          Grupos
        </li>
        
        <li 
          className={getItemClasses('/admin/crear-grupo')}
          onClick={() => onNavigate('/admin/crear-grupo')}
        >
          <CreateGroupIcon className="text-2xl mb-0.5" />
          Crear grupo
        </li>

        <li
          className={getItemClasses('/admin/sesion')}
          onClick={() => onNavigate('/admin/sesion')}
        >
          <SettingsIcon className="text-2xl mb-0.5" />
          Sesión
        </li>
      </ul>
    </nav>
  )
}

export default Navbar