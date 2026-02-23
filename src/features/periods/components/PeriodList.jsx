import PeriodItem from './PeriodItem'
import usePeriodMutations from '../hooks/usePeriodMutations'

const PeriodList = ({ periods }) => {
  const { deletePeriod } = usePeriodMutations()

  const onDelete = (periodId) => {
    deletePeriod.mutate(periodId)
  }

  return (
    <main className="space-y-4">
      {periods.map((period) => (
        <PeriodItem key={period.id} period={period} onDelete={onDelete} />
      ))}
    </main>
  )
}

export default PeriodList
