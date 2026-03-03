import { useNavigate } from 'react-router'
import Header from '@common/layout/Header'
import AddIcon from '@assets/icons/AddIcon'
import Button from '@common/components/Button'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import useCareerMutations from '../hooks/useCareerMutations'

const careerSchema = yup.object({
  name: yup.string().required('El nombre es obligatorio').min(2, 'Mínimo 2 caracteres'),
})

const CreateCareer = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(careerSchema),
  })

  const navigate = useNavigate()

  const handleBack = () => {
    navigate('/admin/carreras')
  }

  const { createCareer } = useCareerMutations()

  const onSubmit = (data) => {
    createCareer.mutate(
      { name: data.name },
      {
        onSuccess: () => {
          handleBack()
        },
      }
    )
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen w-full font-sans text-slate-900 dark:text-slate-100 pb-32">
      <Header title={'Crear carrera'} onBack={handleBack} />

      <form
        id="create-career-form"
        className="max-w-md mx-auto w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <section className="mt-4">
          <h3 className="text-slate-900 dark:text-white text-lg font-bold px-4 pt-4 pb-2">
            Información General
          </h3>
          <div className="px-4 py-3 space-y-4">
            <label className="flex flex-col w-full">
              <span className="text-slate-900 dark:text-slate-300 text-sm font-medium pb-2">
                Nombre de la Carrera
              </span>
              <input
                className="w-full rounded-3xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 h-14 placeholder:text-slate-400 p-4 text-base font-normal leading-normal transition-all"
                placeholder="Ej: Licenciatura en Sistemas"
                type="text"
                {...register('name')}
              />

              {errors.name && (
                <span className="text-red-500 text-xs mt-1">{errors.name.message}</span>
              )}
            </label>
          </div>
        </section>

        <footer className="mt-8 px-4">
          <Button
            form={'create-career-form'}
            type={'submit'}
            message={'Crear carrera'}
            icon={<AddIcon />}
            className={'rounded-xl'}
            disabled={createCareer?.isLoading}
          />
        </footer>
      </form>
    </div>
  )
}

export default CreateCareer
