import { useNavigate } from 'react-router'
import Header from '@common/layout/Header'
import AddIcon from '@assets/icons/AddIcon'
import Button from '@common/components/Button'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import useStudentsMutations from '../hooks/useStudentsMutations'
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
    .transform((v, o) => (o === '' ? null : v)),
  career_id: yup.string().required('Selecciona una carrera'),
})

const CreateStudent = () => {
  const navigate = useNavigate()
  const handleBack = () => navigate('/admin/alumnos')

  const { data: careers, isLoading: isLoadingCareers } = useCareers()
  const { createStudent } = useStudentsMutations()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(studentSchema),
  })

  const onSubmit = (data) => {
    createStudent.mutate(data, { onSuccess: handleBack })
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen w-full pb-32">
      <Header title="Crear Alumno" onBack={handleBack} />
      <form
        id="create-student"
        className="max-w-md mx-auto w-full px-4 mt-4 space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-2 gap-4">
          <label className="flex flex-col">
            <span className="text-sm font-medium pb-2">Nombre</span>
            <input className="input-style border p-4 rounded-3xl" {...register('first_name')} />
            {errors.first_name && (
              <span className="text-red-500 text-xs mt-1">{errors.first_name.message}</span>
            )}
          </label>
          <label className="flex flex-col">
            <span className="text-sm font-medium pb-2">Apellido</span>
            <input className="input-style border p-4 rounded-3xl" {...register('last_name')} />
            {errors.last_name && (
              <span className="text-red-500 text-xs mt-1">{errors.last_name.message}</span>
            )}
          </label>
        </div>

        <label className="flex flex-col">
          <span className="text-sm font-medium pb-2">DNI</span>
          <input className="input-style border p-4 rounded-3xl" type="text" {...register('dni')} />
          {errors.dni && <span className="text-red-500 text-xs mt-1">{errors.dni.message}</span>}
        </label>

        <label className="flex flex-col">
          <span className="text-sm font-medium pb-2">Email (Opcional)</span>
          <input
            className="input-style border p-4 rounded-3xl"
            type="email"
            {...register('email')}
          />
          {errors.email && (
            <span className="text-red-500 text-xs mt-1">{errors.email.message}</span>
          )}
        </label>

        <label className="flex flex-col w-full relative">
          <span className="text-sm font-medium pb-2">Carrera</span>
          <div className="relative w-full">
            <select
              className="appearance-none outline-none focus:outline-none focus:ring-2 focus:ring-primary/20 border border-slate-200 dark:border-slate-700 rounded-3xl bg-white dark:bg-slate-900 w-full h-14 p-4 pr-12 transition-all cursor-pointer disabled:opacity-50"
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

        <Button
          form="create-student"
          type="submit"
          message="Crear"
          icon={<AddIcon />}
          disabled={createStudent.isLoading}
        />
      </form>
    </div>
  )
}
export default CreateStudent
