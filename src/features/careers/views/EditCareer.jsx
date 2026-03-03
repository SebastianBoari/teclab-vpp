import Header from '@common/layout/Header'
import Button from '@common/components/Button'
import EditIcon from '@assets/icons/EditIcon'
import Spinner from '@common/components/Spinner'

import { useNavigate, useParams } from 'react-router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import useCareer from '../hooks/useCareer'
import useCareerMutations from '../hooks/useCareerMutations'

const editCareerSchema = yup.object({
  name: yup.string().required('El nombre es obligatorio').min(2, 'Mínimo 2 caracteres'),
})

const EditCareer = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const { data: career, isLoading } = useCareer({ id })
  const { updateCareer } = useCareerMutations()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editCareerSchema),
  })

  useEffect(() => {
    if (career) {
      reset({
        name: career.name,
      })
    }
  }, [career, reset])

  const handleBack = () => navigate('/admin/carreras')

  const onSubmit = (data) => {
    updateCareer.mutate(
      {
        id,
        name: data.name,
      },
      {
        onSuccess: () => handleBack(),
      }
    )
  }

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen w-full font-sans text-slate-900 dark:text-slate-100 pb-32">
      <Header title={'Detalle de la carrera'} onBack={handleBack} />

      <form
        id="update-career-form"
        className="max-w-md mx-auto w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <section className="mt-4">
          <h3 className="text-slate-900 dark:text-white text-lg font-bold px-4 pt-4 pb-2">
            Información General
          </h3>
          <div className="px-4 py-3">
            <label className="flex flex-col w-full">
              <span className="text-slate-900 dark:text-slate-300 text-sm font-medium pb-2">
                Nombre de la Carrera
              </span>
              <input
                className="w-full rounded-3xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 h-14 placeholder:text-slate-400 p-4 text-base font-normal leading-normal transition-all"
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
            form={'update-career-form'}
            type={'submit'}
            message={'Editar carrera'}
            icon={<EditIcon />}
            className={'rounded-xl'}
            disabled={updateCareer?.isLoading}
          />
        </footer>
      </form>
    </div>
  )
}

export default EditCareer
