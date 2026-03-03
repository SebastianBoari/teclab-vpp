import Header from '@common/layout/Header'
import Button from '@common/components/Button'
import EditIcon from '@assets/icons/EditIcon'
import Spinner from '@common/components/Spinner'

import { useNavigate, useParams } from 'react-router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import usePeriod from '../hooks/usePeriod'
import { formatDateForInput } from '@utils/date.utils'
import usePeriodMutations from '../hooks/usePeriodMutations'

const editPeriodSchema = yup.object({
  name: yup.string().required('El nombre es obligatorio').min(2, 'Mínimo 2 caracteres'),
  startDate: yup.string().required('Fecha obligatoria'),
  endDate: yup
    .string()
    .required('Fecha obligatoria')
    .test('after-start', 'Debe ser posterior al inicio', function (value) {
      const { startDate } = this.parent
      return !value || !startDate || value >= startDate
    }),
  inscriptionStart: yup.string().required('Fecha obligatoria'),
  inscriptionEnd: yup
    .string()
    .required('Fecha obligatoria')
    .test(
      'valid-inscription-range',
      'El cierre debe ser posterior a la apertura y anterior al fin',
      function (value) {
        const { inscriptionStart, endDate } = this.parent
        if (!value || !inscriptionStart || !endDate) return true
        return value >= inscriptionStart && value <= endDate
      }
    ),
})

const EditPeriod = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: period, isLoading } = usePeriod({ id })
  const { updatePeriod } = usePeriodMutations()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editPeriodSchema),
  })

  useEffect(() => {
    if (period) {
      reset({
        name: period.name,
        startDate: period.start_at ? formatDateForInput(period.start_at) : '',
        endDate: period.end_at ? formatDateForInput(period.end_at) : '',
        inscriptionStart: period.enrollment_open_at
          ? formatDateForInput(period.enrollment_open_at)
          : '',
        inscriptionEnd: period.enrollment_close_at
          ? formatDateForInput(period.enrollment_close_at)
          : '',
      })
    }
  }, [period, reset])

  const handleBack = () => navigate('/admin/periodos')

  const onSubmit = (data) => {
    updatePeriod.mutate(
      {
        id,
        name: data.name,
        start_at: data.startDate,
        end_at: data.endDate,
        enrollment_open_at: data.inscriptionStart,
        enrollment_close_at: data.inscriptionEnd,
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
      <Header title={'Detalle del periodo'} onBack={handleBack} />

      <form
        id="update-period-form"
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
                Nombre del Periodo
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
                  {...register('startDate')}
                />
                {errors.startDate && (
                  <span className="text-red-500 text-xs mt-1">{errors.startDate.message}</span>
                )}
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
                  {...register('endDate')}
                />
                {errors.endDate && (
                  <span className="text-red-500 text-xs mt-1">{errors.endDate.message}</span>
                )}
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
                  {...register('inscriptionStart')}
                />
                {errors.inscriptionStart && (
                  <span className="text-red-500 text-xs mt-1">
                    {errors.inscriptionStart.message}
                  </span>
                )}
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
                  {...register('inscriptionEnd')}
                />
                {errors.inscriptionEnd && (
                  <span className="text-red-500 text-xs mt-1">{errors.inscriptionEnd.message}</span>
                )}
              </div>
            </label>
          </div>
        </section>

        <footer className="mt-8 px-4">
          <Button
            form={'update-period-form'}
            type={'submit'}
            message={'Editar periodo'}
            icon={<EditIcon />}
            className={'rounded-xl'}
            disabled={updatePeriod.isLoading}
          />
        </footer>
      </form>
    </div>
  )
}

export default EditPeriod
