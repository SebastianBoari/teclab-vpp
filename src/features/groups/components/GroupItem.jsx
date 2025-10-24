import React from 'react'

const Group = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 flex flex-col gap-4">
        <div className="flex items-start gap-4">
        <div className="flex-1">
            <h2 className="text-base font-bold text-gray-900 dark:text-gray-50">
            Matemáticas Avanzadas
            </h2>
            <div className="flex items-center gap-2 mt-1 text-sm text-gray-500 dark:text-gray-400">
            <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCi5l6cqoo-4qGZ0VmqjfRpuXOGXrtDr4xodMrGqFpHmRmu3CGTCeTzc-DtkedhQuDNmRndjKX1BF0f3FZWH-eWKyD8kydaczIgQKMjHxWzz7LxpWt8_9HGTFLXM7ZssXe5R-v-FKp2ySawZ3Vt0kLRRQYNxq5bBZwpq8UyW_Kl05g6RDLLloCzJya7Nm-GOxuJeqnTImm7fFQ0ctHNDqo21oUIarOJklPsfIYNv5KrKbK-FK3hMAUlA6mbQjyFSzXyMVwdmfoFaxY"
                alt="Tutor avatar"
                className="w-6 h-6 rounded-full"
            />
            <span>Dra. Elena Ramirez</span>
            </div>
        </div>
        <div className="text-right">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-50">
            17/30
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
            Plazas
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
            calendar_today
            </span>
            <span>Lunes y Viernes de 9 a 10hs</span>
        </div>
        <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-base">
            date_range
            </span>
            <span>Desde 05/10/25 hasta 19/02/25</span>
        </div>
        </div>

        <button className="w-full bg-primary text-white font-medium py-2.5 rounded-lg text-sm transition-colors hover:bg-primary/90 mt-2">
        Seleccionar grupo
        </button>
    </div>
  )
}

export default Group