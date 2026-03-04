import { useNavigate, useParams } from 'react-router'
import { useEffect } from 'react'
import Header from '@common/layout/Header'
import EditIcon from '@assets/icons/EditIcon'
import Button from '@common/components/Button'
import Spinner from '@common/components/Spinner'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import useStudentsMutations from '../hooks/useStudentsMutations'
import useStudent from '../hooks/useStudent'
import useCareers from '../../careers/hooks/useCareers'

const studentSchema = yup.object({
  first_name: yup.string().required('Nombre obligatorio'),
  last_name: yup.string().required('Apellido obligatorio'),
  dni: yup
    .string()
    .required('DNI obligatorio')
    .matches(/^[0-9]+$/, 'Solo números'),
  email: yup
    .string()
    .email('Formato inválido')
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value)),
  career_id: yup.string().required('Selecciona una carrera'),
})

const EditStudent = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const handleBack = () => navigate('/admin/alumnos')

  const { data: student, isLoading: isLoadingStudent } = useStudent({ id })
  const { data: careers, isLoading: isLoadingCareers } = useCareers()
  const { updateStudent } = useStudentsMutations()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(studentSchema),
  })

  useEffect(() => {
    if (student) {
      reset({
        first_name: student.first_name,
        last_name: student.last_name,
        dni: student.dni,
        email: student.email || '', // Forzar string vacío para el input si es null
        career_id: student.career_id,
      })
    }
  }, [student, reset])

  const onSubmit = (data) => {
    updateStudent.mutate({ id, ...data }, { onSuccess: handleBack })
  }

  if (isLoadingStudent)
    return (
      <div className="flex justify-center mt-10">
        <Spinner />
      </div>
    )

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen w-full pb-32">
      <Header title="Editar Alumno" onBack={handleBack} />

      <form
        id="edit-student"
        className="max-w-md mx-auto w-full px-4 mt-4 space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-2 gap-4">
          <label className="flex flex-col">
            <span className="text-slate-900 dark:text-slate-300 text-sm font-medium pb-2">
              Nombre
            </span>
            <input
              className="w-full rounded-3xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 h-14 p-4 transition-all"
              {...register('first_name')}
            />
            {errors.first_name && (
              <span className="text-red-500 text-xs mt-1">{errors.first_name.message}</span>
            )}
          </label>
          <label className="flex flex-col">
            <span className="text-slate-900 dark:text-slate-300 text-sm font-medium pb-2">
              Apellido
            </span>
            <input
              className="w-full rounded-3xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 h-14 p-4 transition-all"
              {...register('last_name')}
            />
            {errors.last_name && (
              <span className="text-red-500 text-xs mt-1">{errors.last_name.message}</span>
            )}
          </label>
        </div>

        <label className="flex flex-col">
          <span className="text-slate-900 dark:text-slate-300 text-sm font-medium pb-2">DNI</span>
          <input
            className="w-full rounded-3xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 h-14 p-4 transition-all"
            type="text"
            {...register('dni')}
          />
          {errors.dni && <span className="text-red-500 text-xs mt-1">{errors.dni.message}</span>}
        </label>

        <label className="flex flex-col">
          <span className="text-slate-900 dark:text-slate-300 text-sm font-medium pb-2">
            Email (Opcional)
          </span>
          <input
            className="w-full rounded-3xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 h-14 p-4 transition-all"
            type="email"
            {...register('email')}
          />
          {errors.email && (
            <span className="text-red-500 text-xs mt-1">{errors.email.message}</span>
          )}
        </label>

        <label className="flex flex-col w-full relative">
          <span className="text-slate-900 dark:text-slate-300 text-sm font-medium pb-2">
            Carrera
          </span>
          <div className="relative w-full">
            <select
              className="appearance-none outline-none focus:outline-none focus:ring-2 focus:ring-primary/20 border border-slate-200 dark:border-slate-700 rounded-3xl bg-white dark:bg-slate-900 w-full h-14 p-4 pr-12 transition-all cursor-pointer disabled:opacity-50 text-slate-900 dark:text-white"
              {...register('career_id')}
              disabled={isLoadingCareers}
            >
              <option value="" disabled className="text-slate-400">
                Selecciona una carrera...
              </option>
              {careers?.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          {errors.career_id && (
            <span className="text-red-500 text-xs mt-1">{errors.career_id.message}</span>
          )}
        </label>

        <footer className="mt-8">
          <Button
            form="edit-student"
            type="submit"
            message="Guardar Cambios"
            icon={<EditIcon />}
            className="rounded-xl w-full"
            disabled={updateStudent.isLoading}
          />
        </footer>
      </form>
    </div>
  )
}

export default EditStudent
