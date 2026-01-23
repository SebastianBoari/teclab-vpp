import PeriodItem from './PeriodItem'

const PeriodList = ({ periods }) => {
  return (
    <main className="space-y-4">
      {periods.map((period) => (
        <PeriodItem key={period.id} period={period} />
      ))}
    </main>
  )
}

export default PeriodList