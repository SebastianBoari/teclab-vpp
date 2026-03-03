import { useNavigate, useParams } from 'react-router'
import { useEffect } from 'react'
import Header from '@common/layout/Header'
import EditIcon from '@assets/icons/EditIcon'
import Button from '@common/components/Button'
import Spinner from '@common/components/Spinner'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import useTutorMutations from '../hooks/useTutorMutations'
import useTutor from '../hooks/useTutor'
import useCareers from '../../careers/hooks/useCareers' // <-- Verifica este path

const tutorSchema = yup.object({
  first_name: yup.string().required('Obligatorio'),
  last_name: yup.string().required('Obligatorio'),
  career_id: yup.string().required('Selecciona una carrera'),
})

const EditTutor = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const handleBack = () => navigate('/admin/tutores')

  const { data: tutor, isLoading: isLoadingTutor } = useTutor({ id })
  const { data: careers } = useCareers()
  const { updateTutor } = useTutorMutations()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(tutorSchema),
  })

  useEffect(() => {
    if (tutor) {
      reset({
        first_name: tutor.first_name,
        last_name: tutor.last_name,
        career_id: tutor.career_id,
      })
    }
  }, [tutor, reset])

  const onSubmit = (data) => {
    updateTutor.mutate({ id, ...data }, { onSuccess: handleBack })
  }

  if (isLoadingTutor) return <Spinner />

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen w-full pb-32">
      <Header title="Editar Tutor" onBack={handleBack} />
      <form
        id="edit-tutor"
        className="max-w-md mx-auto w-full px-4 mt-4 space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="flex flex-col">
          <span className="text-sm font-medium pb-2">Nombre</span>
          <input className="input-style border p-4 rounded-3xl" {...register('first_name')} />
          {errors.first_name && (
            <span className="text-red-500 text-xs">{errors.first_name.message}</span>
          )}
        </label>

        <label className="flex flex-col">
          <span className="text-sm font-medium pb-2">Apellido</span>
          <input className="input-style border p-4 rounded-3xl" {...register('last_name')} />
          {errors.last_name && (
            <span className="text-red-500 text-xs">{errors.last_name.message}</span>
          )}
        </label>

        <label className="flex flex-col">
          <span className="text-sm font-medium pb-2">Carrera</span>
          <select
            className="input-style border p-4 rounded-3xl bg-white dark:bg-slate-900"
            {...register('career_id')}
          >
            <option value="">Selecciona una carrera...</option>
            {careers?.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          {errors.career_id && (
            <span className="text-red-500 text-xs">{errors.career_id.message}</span>
          )}
        </label>

        <Button
          form="edit-tutor"
          type="submit"
          message="Guardar"
          icon={<EditIcon />}
          disabled={updateTutor.isLoading}
        />
      </form>
    </div>
  )
}
export default EditTutor
