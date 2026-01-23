import AddIcon from '@assets/icons/AddIcon'
import Button from '@common/components/Button'

const CreatePeriodButton = ({ onCreate }) => {
  return (
    <Button onClick={onCreate} message={'Crear periodo'} icon={<AddIcon />} className={'rounded-xl'}/>
  )
}

export default CreatePeriodButton