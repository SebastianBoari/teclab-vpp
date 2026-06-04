import Button from '@common/components/Button'
import DownloadIcon from '@assets/icons/DownloadIcon'

const DownloadTemplate = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col gap-6">
      <p className="text-slate-600 max-w-xl">
        Carga múltiple de alumnos a través de un archivo CSV. Límite máximo de 100 alumnos por
        carga.
      </p>
      <Button
        message="Descargar plantilla CSV"
        className={
          'bg-white border border-slate-300 p-4 text-slate-400! font-normal rounded-4xl! hover:bg-slate-100 hover:text-slate-500!'
        }
        icon={<DownloadIcon />}
      />
    </div>
  )
}

export default DownloadTemplate
