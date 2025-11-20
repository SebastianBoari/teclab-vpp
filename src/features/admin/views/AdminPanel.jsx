import Header from '@/shared/layout/Header'
const ArrowBackIcon = () => <span>←</span>
const LockIcon = () => <span>🔒</span>

const AdminPanel = () => {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title={'Administrar grupos'} sticky={true}/>

      <main className="flex-1 space-y-6 p-4">
        <section>
          <h2 className="mb-2 text-sm font-medium text-slate-600 dark:text-slate-400">
            Año Académico
          </h2>
          <select className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
            <option>2023-2024</option>
            <option>2022-2023</option>
          </select>
        </section>

        <section>
          <h2 className="mb-2 text-sm font-medium text-slate-600 dark:text-slate-400">
            Periodo
          </h2>
          <select className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
            <option>Periodo 1</option>
            <option>Periodo 2</option>
          </select>
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold">Grupos</h2>
            <button className="rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary dark:bg-primary/20">
              Cerrar Inscripciones
            </button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-lg bg-white p-4 dark:bg-slate-800">
              <div>
                <p className="font-semibold">Grupo A</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Estudiantes: 15/20
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="flex h-9 items-center justify-center rounded-full bg-primary/10 px-4 text-sm font-semibold text-primary dark:bg-primary/20">
                  Ver Detalles
                </button>
                <button className="flex h-9 w-9 items-center justify-center rounded-full bg-red-500/10 text-red-500 dark:bg-red-500/20">
                  <LockIcon />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-lg bg-white p-4 dark:bg-slate-800">
              <div>
                <p className="font-semibold">Grupo B</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Estudiantes: 18/20
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="flex h-9 items-center justify-center rounded-full bg-primary/10 px-4 text-sm font-semibold text-primary dark:bg-primary/20">
                  Ver Detalles
                </button>
                <button className="flex h-9 w-9 items-center justify-center rounded-full bg-red-500/10 text-red-500 dark:bg-red-500/20">
                  <LockIcon />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-lg bg-white p-4 dark:bg-slate-800">
              <div>
                <p className="font-semibold">Grupo C</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Estudiantes: 12/20
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="flex h-9 items-center justify-center rounded-full bg-primary/10 px-4 text-sm font-semibold text-primary dark:bg-primary/20">
                  Ver Detalles
                </button>
                <button className="flex h-9 w-9 items-center justify-center rounded-full bg-red-500/10 text-red-500 dark:bg-red-500/20">
                  <LockIcon />
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-xl bg-white p-4 dark:bg-slate-800">
          <h2 className="mb-4 text-xl font-bold">Publicar Nuevo Grupo</h2>
          <form className="space-y-4">
            <select className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
              <option>Seleccionar Tutor</option>
              <option>Juan Pérez</option>
              <option>María García</option>
            </select>

            <input
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-600 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-400"
              placeholder="Días y Horas (ej. Lu 10-12, Mi 14-16)"
              type="text"
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-600 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-400"
                onBlur={(e) => (e.target.type = 'text')}
                onFocus={(e) => (e.target.type = 'date')}
                placeholder="Fecha de Inicio"
                type="text"
              />
              <input
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-600 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-400"
                onBlur={(e) => (e.target.type = 'text')}
                onFocus={(e) => (e.target.type = 'date')}
                placeholder="Fecha de Fin"
                type="text"
              />
            </div>

            <input
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-600 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-400"
              placeholder="Total de Cupos"
              type="number"
            />
          </form>
        </section>
      </main>

      <footer className="sticky bottom-0 border-t border-slate-200 bg-slate-50/80 p-4 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/80">
        <button className="w-full rounded-lg bg-primary py-3 text-base font-semibold text-white">
          Publicar Grupo
        </button>
      </footer>
    </div>
  )
}

export default AdminPanel