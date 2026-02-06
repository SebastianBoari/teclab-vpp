import { useNavigate } from 'react-router'
import Header from '@common/layout/Header'
import AddIcon from '@assets/icons/AddIcon'
import Button from '@common/components/Button'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import usePeriodMutations from '../hooks/usePeriodMutations'

const today = new Date().toISOString().split('T')[0]

const periodSchema = yup.object({
  name: yup.string().required('El nombre es obligatorio').min(2, 'Mínimo 2 caracteres'),

  startDate: yup
    .string()
    .required('Fecha obligatoria')
    .test('not-in-past', 'No puede ser una fecha pasada', (value) => !value || value >= today),

  endDate: yup
    .string()
    .required('Fecha obligatoria')
    .test('after-start', 'Debe ser posterior al inicio', function (value) {
      const { startDate } = this.parent
      return !value || !startDate || value >= startDate
    }),

  inscriptionStart: yup
    .string()
    .required('Fecha obligatoria')
    .test(
      'inscription-not-past',
      'No puede ser una fecha pasada',
      (value) => !value || value >= today
    ),

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

const CreatePeriod = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(periodSchema),
  })

  const navigate = useNavigate()

  const handleBack = () => {
    navigate('/admin/periodos')
  }

  const { createPeriod } = usePeriodMutations()

  const onSubmit = (data) => {
    const newPeriod = {
      name: data.name,
      start_at: data.startDate,
      end_at: data.endDate,
      enrollment_open_at: data.inscriptionStart,
      enrollment_close_at: data.inscriptionEnd,
    }

    createPeriod.mutate(newPeriod)

    if (createPeriod.isSuccess) handleBack()
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen w-full font-sans text-slate-900 dark:text-slate-100 pb-32">
      <Header title={'Detalle del periodo'} onBack={handleBack} />

      <form
        id="create-period-form"
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
                placeholder="Ej: 1A 2027"
                type="text"
                defaultValue="1A"
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
                  min={today}
                  {...register('startDate')}
                />

                {errors.startDate && (
                  <span className="text-red-500 text-xs">{errors.startDate.message}</span>
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
                  min={today}
                  {...register('endDate')}
                />

                {errors.endDate && (
                  <span className="text-red-500 text-xs">{errors.endDate.message}</span>
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
                  min={today}
                  {...register('inscriptionStart')}
                />

                {errors.inscriptionStart && (
                  <span className="text-red-500 text-xs">{errors.inscriptionStart.message}</span>
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
                  min={today}
                  {...register('inscriptionEnd')}
                />

                {errors.inscriptionEnd && (
                  <span className="text-red-500 text-xs">{errors.inscriptionEnd.message}</span>
                )}
              </div>
            </label>
          </div>
        </section>

        <footer className="mt-8 px-4">
          <Button
            form={'create-period-form'}
            type={'submit'}
            message={'Crear periodo'}
            icon={<AddIcon />}
            className={'rounded-xl'}
            disabled={createPeriod.isLoading}
          />
        </footer>
      </form>
    </div>
  )
}

export default CreatePeriod
