import ScheduleIcon from '@assets/icons/ScheduleIcon'
import CalendarIcon from '@assets/icons/CalendarIcon'
import CheckIcon from '@assets/icons/CheckIcon'
import WhatsAppIcon from '@assets/icons/WhatsAppIcon'
import VideoCallIcon from '@assets/icons/VideoCallIcon'
import { formatHours } from '@utils/date.utils' // Asumo que tienes esta utilidad

const GroupDetails = ({ group }) => {
    if (!group) return null

    const { 
        group_name, 
        tutors, 
        schedule, 
        link_whapp, 
        link_meet 
    } = group

    const tutorName = tutors 
        ? `${tutors.first_name} ${tutors.last_name}` 
        : 'Tutor por asignar'
    
    const tutorAvatar = tutors 
        ? `https://ui-avatars.com/api/?name=${tutors.first_name}+${tutors.last_name}&background=random&color=fff&size=128`
        : 'https://ui-avatars.com/api/?name=Tutor&background=ccc&color=fff'

    const hasSchedule = schedule && schedule.length > 0
    
    const daysText = hasSchedule 
        ? schedule.map(s => s.day).join(' y ') 
        : 'A confirmar'

    const timeText = hasSchedule 
        ? `${formatHours(schedule[0].time)}hs` 
        : 'A confirmar'

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
                        <img 
                            className="size-16 rounded-full object-cover" 
                            src={tutorAvatar} 
                            alt={`Foto de ${tutorName}`} 
                        />
                        <div className="flex flex-col gap-1">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                {group_name || 'Grupo sin nombre'}
                            </h2>
                            <p className="text-base text-gray-600 dark:text-gray-400">
                                {tutorName}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-500">
                                Tutor a cargo
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-4 p-5 sm:flex-row sm:gap-8">
                    <div className="flex items-center gap-4">
                        <div className="flex size-11 items-center justify-center rounded-full bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400">
                            <CalendarIcon />
                        </div>
                        <div className="flex flex-col">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Días</p>
                            <p className="font-semibold text-gray-900 dark:text-white capitalize">
                                {daysText}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex size-11 items-center justify-center rounded-full bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400">
                            <ScheduleIcon />
                        </div>
                        <div className="flex flex-col">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Hora</p>
                            <p className="font-semibold text-gray-900 dark:text-white">
                                {timeText}
                            </p>
                        </div>
                    </div>
                </div>


                <div className="flex flex-col gap-3 p-5">
                    <ActionLink 
                        href={link_whapp}
                        icon={<WhatsAppIcon />}
                        label="Unirse al grupo de WhatsApp"
                        colorClass="bg-[#25D366] hover:bg-[#1EAE54] text-white"
                        disabledClass="border-gray-200 dark:border-gray-500 bg-white dark:bg-gray-500 text-gray-300 dark:text-gray-200"
                    />

                    <ActionLink 
                        href={link_meet}
                        icon={<VideoCallIcon width={36} height={36}/>}
                        label="Acceder a la videollamada"
                        colorClass="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                        disabledClass="border-gray-200 dark:border-gray-500 bg-white dark:bg-gray-500 text-gray-300 dark:text-gray-200"
                        isOutlined={true}
                    />
                </div>
            </div>
        </div>
    )
}


const ActionLink = ({ href, icon, label, colorClass, disabledClass, isOutlined }) => {
    const baseClass = 'flex h-12 items-center justify-center gap-2.5 rounded-lg px-4 text-sm font-semibold shadow-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'
    const borderClass = isOutlined ? 'border' : ''

    if (href) {
        return (
            <a 
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${baseClass} ${borderClass} ${colorClass}`}
            >
                {icon}
                <span>{label}</span>
            </a>
        )
    }

    return (
        <button disabled className={`${baseClass} border ${disabledClass}`}>
            {icon}
            <span>{label}</span>
        </button>
    )
}

export default GroupDetails