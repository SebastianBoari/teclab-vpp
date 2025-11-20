import ScheduleIcon from '@assets/icons/ScheduleIcon'
import CalendarIcon from '@assets/icons/CalendarIcon'
import CheckIcon from '@assets/icons/CheckIcon'
import WhatsAppIcon from '@assets/icons/WhatsAppIcon'
import VideoCallIcon from '@assets/icons/VideoCallIcon'

export const GroupDetails = ({ group }) => {
    const { link_whapp, link_meet } = group

    return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto">
        <div className="flex items-center gap-3 rounded-xl bg-green-100 dark:bg-green-900/40 p-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-green-500 text-white">
                <CheckIcon />
            </div>

            <div className="flex flex-col">
                <p className="text-base font-bold text-green-800 dark:text-green-200">¡Inscripción exitosa!</p>
                <p className="text-sm text-green-700 dark:text-green-300">Te has inscrito correctamente en el grupo.</p>
            </div>

        </div>

        <div className="flex flex-col divide-y divide-gray-200 dark:divide-gray-700 rounded-xl bg-white dark:bg-gray-800 shadow-sm">
            <div className="p-5">
                <div className="flex items-start gap-4">
                    <img className="size-16 rounded-full object-cover" src={group?.tutor?.avatar || 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6IOiO_JIDNEKiLRqfsnnxEuaxfjfXdDEU1KhN4mDVOcyrDOTLuWsJsueXw4CKtylO907NSUNDtA9nXUrjDKezLuFHZF8ZvW1B8D6nVNsyb5WzTgqPxv0VYAwsM96AQxSNyiWOPOQ1mAeqSyGgo0JkcFFszzzySA2JRLmbTRFqOEVfIuVOYSb9gyUQ6yIwz6rB2quhxmVLK_0Q3rmlU_vmibZ6OVP0qStLY8VScwfMU4mfgjIrgDanpZkSB6wrOqsVaEIZfgEwQrc'} alt="Foto de perfil del tutor" />

                    <div className="flex flex-col gap-1">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{group?.name || 'Grupo por asignar'}</h2>
                        <p className="text-base text-gray-600 dark:text-gray-400">{group?.tutor?.name || 'Tutor por asignar'}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-500">Tutor a cargo</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-2 p-5">
                <div className="flex items-center gap-4">
                    <div className="flex size-11 items-center justify-center rounded-full bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400">
                        <CalendarIcon />
                    </div>

                    <div className="flex flex-col">
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Días</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{group?.schedule?.days || 'A confirmar'}</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex size-11 items-center justify-center rounded-full bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400">
                        <ScheduleIcon />
                    </div>
                    
                    <div className="flex flex-col">
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Hora</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{group?.schedule?.time || 'A confirmar'}</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-3 p-5">
                {link_whapp ? (
                    <a 
                    href={link_whapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 items-center justify-center gap-2.5 rounded-lg bg-[#25D366] px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#1EAE54] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
                    >
                        <WhatsAppIcon />
                        <span>Unirse al grupo de WhatsApp</span>
                    </a>
                ) : (
                    <button 
                    disabled 
                    className="flex h-12 items-center justify-center gap-2.5 rounded-lg border border-gray-200 dark:border-gray-500 bg-white dark:bg-gray-500 px-4 text-sm font-semibold text-gray-300 dark:text-gray-200 shadow-sm transition-color">
                        <WhatsAppIcon />
                        <span>Unirse al grupo de WhatsApp</span>
                    </button>
                )}

                {link_meet ? (
                    <a 
                    href={link_meet}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 items-center justify-center gap-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 text-sm font-semibold text-gray-700 dark:text-gray-200 shadow-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                    >
                        <VideoCallIcon width={36} height={36}/>
                        <span>Acceder a la videollamada</span>
                    </a>
                ) : (
                    <button 
                    disabled
                    className="flex h-12 items-center justify-center gap-2.5 rounded-lg border border-gray-200 dark:border-gray-500 bg-white dark:bg-gray-500 px-4 text-sm font-semibold text-gray-300 dark:text-gray-200 shadow-sm transition-color"
                    >
                        <VideoCallIcon width={36} height={36}/>
                        <span>Acceder a la videollamada</span>
                    </button>
                )}

            </div>
        </div>
    </div>
    )
}

export default GroupDetails