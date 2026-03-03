import { useNavigate } from 'react-router'
import Header from '@common/layout/Header'
import Button from '@common/components/Button'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import useTutorMutations from '../hooks/useTutorMutations'
import useCareers from '../../careers/hooks/useCareers' // <-- Verifica este path

const tutorSchema = yup.object({
  first_name: yup.string().required('Obligatorio'),
  last_name: yup.string().required('Obligatorio'),
  career_id: yup.string().required('Selecciona una carrera'),
})

const CreateTutor = () => {
  const navigate = useNavigate()
  const handleBack = () => navigate('/admin/tutores')

  const { data: careers, isLoading: isLoadingCareers } = useCareers()
  const { createTutor } = useTutorMutations()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(tutorSchema),
  })

  const onSubmit = (data) => {
    createTutor.mutate(data, { onSuccess: handleBack })
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen w-full pb-32">
      <Header title="Agregar Tutor" onBack={handleBack} />
      <form
        id="create-tutor"
        className="max-w-md mx-auto w-full px-4 mt-4 space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="flex flex-col">
          <span className="text-slate-900 dark:text-slate-300 text-sm font-medium pb-2">
            Nombre
          </span>
          <input
            className="w-full rounded-3xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 h-14 placeholder:text-slate-400 p-4 text-base font-normal leading-normal transition-all"
            type="text"
            placeholder="Ej: Juana"
            {...register('first_name')}
          />
          {errors.first_name && (
            <span className="text-red-500 text-xs">{errors.first_name.message}</span>
          )}
        </label>

        <label className="flex flex-col">
          <span className="text-slate-900 dark:text-slate-300 text-sm font-medium pb-2">
            Apellido
          </span>
          <input
            className="w-full rounded-3xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 h-14 placeholder:text-slate-400 p-4 text-base font-normal leading-normal transition-all"
            type="text"
            placeholder="Ej: Pérez"
            {...register('last_name')}
          />
          {errors.last_name && (
            <span className="text-red-500 text-xs">{errors.last_name.message}</span>
          )}
        </label>

        <label className="flex flex-col">
          <span className="text-slate-900 dark:text-slate-300 text-sm font-medium pb-2">
            Carrera
          </span>
          <select
            className="appearance-none w-full rounded-3xl text-slate-400 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 h-14 placeholder:text-slate-400 p-4 text-base font-normal leading-normal transition-all"
            {...register('career_id')}
            disabled={isLoadingCareers}
          >
            <option value="">Selecciona una carrera...</option>
            {careers?.map((career) => (
              <option key={career.id} value={career.id}>
                {career.name}
              </option>
            ))}
          </select>
          {errors.career_id && (
            <span className="text-red-500 text-xs">{errors.career_id.message}</span>
          )}
        </label>

        <Button
          form="create-tutor"
          type="submit"
          message="Confirmar"
          disabled={createTutor.isLoading}
        />
      </form>
    </div>
  )
}
export default CreateTutor
