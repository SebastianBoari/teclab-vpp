import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import Header from '@common/layout/Header'
import Spinner from '@common/components/Spinner'
import StudentsList from './components/StudentsList'
import { Navbar } from '@/features/admin'
import useStudents from './hooks/useStudents'

import SearchIcon from '@assets/icons/SearchIcon'
import AddUserIcon from '@assets/icons/AddUserIcon'
import AddPeopleIcon from '@assets/icons/AddPeopleIcon'

const PAGE_SIZE = 10

const StudentsContainer = () => {
  const navigate = useNavigate()

  const [page, setPage] = useState(1)
  const [searchInput, setSearchInput] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')

  const handleNavigate = () => navigate('/admin/alumnos/crear')

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchInput)
      setPage(1)
    }, 400)

    return () => clearTimeout(handler)
  }, [searchInput])

  const { data, isLoading, isPlaceholderData, error } = useStudents({
    page,
    search: debouncedSearch,
  })

  if (isLoading && !isPlaceholderData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-900">
        <Spinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-900">
        <p className="text-slate-900 dark:text-white">
          Error al cargar los alumnos. Intenta más tarde.
        </p>
      </div>
    )
  }

  const { students = [], totalCount = 0 } = data || {}
  const totalPages = Math.ceil(totalCount / PAGE_SIZE)

  return (
    <section className="flex flex-col gap-2 bg-slate-50 dark:bg-slate-900 min-h-screen">
      <Header title="Alumnos" />

      <div id="students-content" className="grid place-items-center mb-24">
        <div className="flex flex-col gap-4">
          <div className="flex items-center no-wrap gap-2 self-start">
            <div className="flex items-center relative flex-1">
              <label
                htmlFor="searchbar"
                className="absolute left-3 flex items-center pointer-events-none"
              >
                <SearchIcon className="text-slate-400" width="18px" height="18px" />
              </label>
              <input
                id="searchbar"
                type="text"
                placeholder="Nombre o DNI..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white dark:bg-slate-800 dark:border-slate-700 dark:text-white placeholder:text-slate-400"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                onClick={handleNavigate}
                title="Añadir alumno individual"
              >
                <AddUserIcon
                  width="18px"
                  height="18px"
                  className="text-slate-500 dark:text-slate-400"
                />
              </button>

              <button
                className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                title="Carga masiva"
              >
                <AddPeopleIcon
                  width="18px"
                  height="18px"
                  className="text-slate-500 dark:text-slate-400"
                />
              </button>
            </div>
          </div>

          {students.length === 0 ? (
            <div className="flex justify-center mt-10">
              <p className="text-slate-500 dark:text-slate-400">
                No se encontraron alumnos disponibles.
              </p>
            </div>
          ) : (
            <>
              <div
                className={
                  isPlaceholderData ? 'opacity-60 transition-opacity duration-200' : 'opacity-100'
                }
              >
                <StudentsList students={students} />
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4">
                  <button
                    disabled={page === 1 || isPlaceholderData}
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    className="px-3 py-1.5 rounded-lg border text-sm font-medium bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors hover:bg-slate-50 dark:hover:bg-slate-700"
                  >
                    Anterior
                  </button>
                  <span className="text-sm text-slate-500 dark:text-slate-400 select-none">
                    Página {page} de {totalPages} ({totalCount} alumnos)
                  </span>
                  <button
                    disabled={page >= totalPages || isPlaceholderData}
                    onClick={() => setPage((prev) => prev + 1)}
                    className="px-3 py-1.5 rounded-lg border text-sm font-medium bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors hover:bg-slate-50 dark:hover:bg-slate-700"
                  >
                    Siguiente
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <footer>
        <Navbar />
      </footer>
    </section>
  )
}

export default StudentsContainer
