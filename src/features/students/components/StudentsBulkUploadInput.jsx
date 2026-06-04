import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import UploadIcon from '@assets/icons/UploadIcon'

const StudentsBulkUploadInput = ({ file, onFileSelected, onClearFile }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        onFileSelected(acceptedFiles[0])
      }
    },
    [onFileSelected]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
    },
    maxFiles: 1,
  })

  if (file) {
    return (
      <div className="w-full p-8 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center gap-4 transition-all duration-200 text-center border-slate-600 min-h-48">
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
          Archivo cargado:{' '}
          <span className="text-slate-900 dark:text-white font-medium">{file.name}</span>
        </p>

        <button
          onClick={onClearFile}
          className="mt-4 text-xs font-medium text-red-700 cursor-pointer hover:text-red-600 transition duration-200 underline underline-offset-4"
        >
          Eliminar y subir otro archivo
        </button>
      </div>
    )
  }

  // Si no hay archivo, mostramos el Dropzone
  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`w-full p-8 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center gap-4 transition-all duration-200 text-center cursor-pointer ${
          isDragActive
            ? 'border-blue-500 bg-blue-50/40 dark:bg-blue-950/20'
            : 'border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-400 dark:hover:border-slate-600'
        }`}
      >
        <input {...getInputProps()} />

        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center transition-transform duration-200">
          <UploadIcon width="24px" height="24px" />
        </div>

        <div className="flex flex-col gap-1 px-4">
          <p className="text-base font-medium text-slate-800 dark:text-slate-200">
            {isDragActive ? 'Suelta el archivo aquí...' : 'Selecciona o arrastra tu archivo CSV'}
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-normal">
            Máximo 100 alumnos por archivo (MB máx: 5)
          </p>
        </div>
      </div>
    </div>
  )
}

export default StudentsBulkUploadInput
