import { useNavigate } from 'react-router'
import Header from '@common/layout/Header'
import DeleteIcon from '@assets/icons/DeleteIcon'

const PeriodDetails = () => {
  const today = new Date().toISOString().split('T')[0]

  const navigate = useNavigate()

  const handleBack = () => {
    navigate('/admin/periodos')
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen w-full font-sans text-slate-900 dark:text-slate-100 pb-32">
      <Header title={'Detalle del periodo'} onBack={handleBack} />

      <main className="max-w-md mx-auto w-full">
        <section className="mt-4">
          <h3 className="text-slate-900 dark:text-white text-lg font-bold px-4 pt-4 pb-2">
            Información General
          </h3>
          <div className="px-4 py-3 space-y-4">
            <label className="flex flex-col w-full">
              <span className="text-slate-900 dark:text-slate-300 text-sm font-medium pb-2">
                Nombre del Periodo
              </span>
              <input
                className="w-full rounded-3xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 h-14 placeholder:text-slate-400 p-4 text-base font-normal leading-normal transition-all"
                placeholder="Ej: 1A 2027"
                type="text"
                defaultValue="1A"
              />
            </label>
          </div>
        </section>

        <section className="mt-4">
          <h3 className="text-slate-900 dark:text-white text-lg font-bold px-4 pt-4 pb-2">
            Rango de Cursada
          </h3>
          <div className="px-4 py-3 grid grid-cols-2 gap-4">
            <label className="flex flex-col">
              <span className="text-slate-900 dark:text-slate-300 text-sm font-medium pb-2">
                Fecha Inicio
              </span>

              <div className="relative">
                <input
                  className="w-full rounded-3xl text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 h-14 p-4 text-base focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  type="date"
                  min={today}
                />
              </div>
            </label>

            <label className="flex flex-col">
              <span className="text-slate-900 dark:text-slate-300 text-sm font-medium pb-2">
                Fecha Fin
              </span>

              <div className="relative">
                <input
                  className="w-full rounded-3xl text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 h-14 p-4 text-base focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  type="date"
                  min={today}
                />
              </div>
            </label>
          </div>
        </section>

        <section className="mt-4">
          <h3 className="text-slate-900 dark:text-white text-lg font-bold px-4 pt-4 pb-2">
            Rango de Inscripción
          </h3>
          <div className="px-4 py-3 grid grid-cols-2 gap-4">
            <label className="flex flex-col">
              <span className="text-slate-900 dark:text-slate-300 text-sm font-medium pb-2">
                Apertura
              </span>
              <div className="relative">
                <input
                  className="w-full rounded-3xl text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 h-14 p-4 text-base focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  type="date"
                  min={today}
                />
              </div>
            </label>
            <label className="flex flex-col">
              <span className="text-slate-900 dark:text-slate-300 text-sm font-medium pb-2">
                Cierre
              </span>
              <div className="relative">
                <input
                  className="w-full rounded-3xl text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 h-14 p-4 text-base focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  type="date"
                  min={today}
                />
              </div>
            </label>
          </div>
        </section>

        <footer className="flex flex-col gap-5 mt-8 px-4">
          <button className="w-full flex items-center justify-center gap-2 p-4 text-red-500 font-medium border border-red-200 dark:border-red-900/30 rounded-3xl hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-[20px]">
              <DeleteIcon />
            </span>
            Eliminar Periodo
          </button>

          <button className="w-full bg-primary text-white font-bold py-4 rounded-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2 hover:bg-opacity-90 cursor-pointer hover:bg-primary/90">
            Guardar Cambios
          </button>
        </footer>
      </main>
    </div>
  )
}

export default PeriodDetails
