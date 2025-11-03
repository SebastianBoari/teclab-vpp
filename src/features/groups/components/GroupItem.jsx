const GroupItem = ({ group }) => {
    const {
        id,
        group_name,
        category,
        periods,
        capacity,
        tutors,
        schedule,
    } = group
    
    const formatDate = (isoDate) => {
        if (!isoDate) return
        const [year, month, day] = isoDate.split('-')
        return `${day}/${month}`
    }

    const formatHours = (hoursString) => {
        if (!hoursString) return
        const [startHour, endHour] = hoursString.split('-')
        return `${startHour} a ${endHour}`
    }

    return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 flex flex-col gap-4">
        <div className="flex items-start gap-4">
            <div className="flex-1">
                <h2 className="text-base font-bold text-gray-900 dark:text-gray-50">
                    {group_name} {category.toUpperCase()}
                </h2>

                <div className="flex items-center gap-2 mt-1 text-sm text-gray-500 dark:text-gray-400">
                    <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCi5l6cqoo-4qGZ0VmqjfRpuXOGXrtDr4xodMrGqFpHmRmu3CGTCeTzc-DtkedhQuDNmRndjKX1BF0f3FZWH-eWKyD8kydaczIgQKMjHxWzz7LxpWt8_9HGTFLXM7ZssXe5R-v-FKp2ySawZ3Vt0kLRRQYNxq5bBZwpq8UyW_Kl05g6RDLLloCzJya7Nm-GOxuJeqnTImm7fFQ0ctHNDqo21oUIarOJklPsfIYNv5KrKbK-FK3hMAUlA6mbQjyFSzXyMVwdmfoFaxY"
                        alt="Tutor avatar"
                        className="w-6 h-6 rounded-full"
                    />

                    <span>{tutors.first_name} {tutors.last_name}</span>
                </div>
            </div>

            <div className="text-right">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-50">
                    {capacity}
                </p>

                <p className="text-xs text-gray-500 dark:text-gray-400">
                    plazas
                </p>
            </div>
        </div>

        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
                className="bg-primary h-2 rounded-full"
                style={{ width: '56.66%' }}
            ></div>
        </div>

        <div className="mt-2 space-y-2 text-sm text-gray-600 dark:text-gray-300">
            <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11.5 3a9.5 9.5 0 0 1 9.5 9.5a9.5 9.5 0 0 1-9.5 9.5A9.5 9.5 0 0 1 2 12.5A9.5 9.5 0 0 1 11.5 3m0 1A8.5 8.5 0 0 0 3 12.5a8.5 8.5 0 0 0 8.5 8.5a8.5 8.5 0 0 0 8.5-8.5A8.5 8.5 0 0 0 11.5 4M11 7h1v5.42l4.7 2.71l-.5.87l-5.2-3z"/></svg>
                </span>
                
                {
                    schedule.length === 0 ? (
                        <span>Horario no disponible</span>
                    ) : <span>{schedule.length > 1 ? schedule[0].day + ' y ' + schedule[1].day : schedule[0].day} de {formatHours(schedule[0].time)}hs</span>
                }
            </div>

            <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M7 2h1a1 1 0 0 1 1 1v1h5V3a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a3 3 0 0 1 3 3v11a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3V3a1 1 0 0 1 1-1m8 2h1V3h-1zM8 4V3H7v1zM6 5a2 2 0 0 0-2 2v1h15V7a2 2 0 0 0-2-2zM4 18a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V9H4zm8-5h5v5h-5zm1 1v3h3v-3z"/></svg>
                </span>

                <span>Desde {formatDate(periods.start_at)} hasta {formatDate(periods.end_at)}</span>
            </div>
        </div>

        <button className="w-full bg-primary text-white font-medium py-2.5 rounded-lg text-sm transition-colors hover:bg-primary/90 mt-2">
            Seleccionar grupo
        </button>
    </div>
  )
}

export default GroupItem