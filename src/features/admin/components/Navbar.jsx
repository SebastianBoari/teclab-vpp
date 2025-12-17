import GroupIcon from '@assets/icons/GroupIcon'
import CreateGroupIcon from '@assets/icons/CreateGroupIcon'
import SettingsIcon from '@assets/icons/SettingsIcon'

const Navbar = () => {
  return (
        <nav className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-sm border-t border-slate-200 z-50">
          <ul className="flex justify-around items-center h-16 text-xs">
            <li className="flex flex-col items-center justify-center gap-1 w-full h-full cursor-pointer text-slate-500 font-medium hover:text-slate-700 hover:bg-slate-100">
              <GroupIcon className="text-2xl mb-0.5" /> 
              Grupos
            </li>
            
            <li className="flex flex-col items-center justify-center gap-1 w-full h-full cursor-pointer text-slate-500 font-medium hover:text-slate-700 hover:bg-slate-100">
              <CreateGroupIcon className="text-2xl mb-0.5" />
              Crear grupo
            </li>

            <li className="flex flex-col items-center justify-center gap-1 w-full h-full cursor-pointer text-slate-500 font-medium hover:text-slate-700 transition-colors hover:bg-slate-100">
              <SettingsIcon className="text-2xl mb-0.5" />
              Sesión
            </li>
          </ul>
        </nav>
  )
}

export default Navbar