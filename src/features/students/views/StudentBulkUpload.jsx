import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import Header from '@common/layout/Header'
import Button from '@common/components/Button'
import UploadIcon from '@assets/icons/UploadIcon'
import useStudentBulkUpload from '../hooks/useStudentBulkUpload'
import StudentsBulkUploadInput from '../components/StudentsBulkUploadInput'
import StudentsBulkUploadTable from '../components/StudentsBulkUploadTable'
import DownloadTemplate from '../components/DownloadTemplate'
import useStudentsMutations from '../hooks/useStudentsMutations'

const StudentBulkUpload = () => {
  const navigate = useNavigate()
  const handleBack = () => navigate('/admin/alumnos')
  const { file, errors, parsedStudents, handleFileSelected, clearFile } = useStudentBulkUpload()
  const [ignoredStudents, setIgnoredStudents] = useState([])
  const { bulkCreateStudents } = useStudentsMutations()
  const [isSubmitted, setIsSubmitted] = useState(false)
  useEffect(() => {
    setIsSubmitted(false)
    setIgnoredStudents([])
  }, [file])
  const handleBulkUpload = () => {
    const payload = parsedStudents.map((student) => {
      setIsSubmitted(true)
      // eslint-disable-next-line no-unused-vars
      const { career, ...studentDataForDB } = student
      return studentDataForDB
    })

    bulkCreateStudents.mutate(payload, {
      onSuccess: (result) => {
        if (result.duplicates.length > 0) {
          console.log(result.duplicates)
          setIgnoredStudents(result.duplicates)
        } else {
          clearFile()
        }
      },
    })
  }

  return (
    <section className="bg-slate-50 dark:bg-slate-900 min-h-screen w-full pb-32 flex flex-col gap-8">
      <Header title="Alumnos: Carga masiva" onBack={handleBack} />

      <main className="flex flex-col gap-6 items-center max-w-2xl min-w-2xs mx-auto">
        <header className="w-full flex flex-col">
          <DownloadTemplate />
        </header>

        <div className="w-full flex flex-col">
          <StudentsBulkUploadInput
            file={file}
            onFileSelected={handleFileSelected}
            onClearFile={clearFile}
          />
        </div>

        {errors.length > 0 && <StudentsBulkUploadTable status="error" data={errors} />}
        {ignoredStudents.length > 0 && (
          <StudentsBulkUploadTable status="warning" data={ignoredStudents} />
        )}
        {parsedStudents.length > 0 && !isSubmitted && (
          <StudentsBulkUploadTable status="success" data={parsedStudents} />
        )}

        <footer className="w-full">
          <Button
            disabled={parsedStudents.length === 0 || errors.length > 0 || isSubmitted}
            message="Listo, subir alumnos"
            className={'rounded-xl! hover:shadow-md hover:bg-primary/90 transition duration-200'}
            icon={<UploadIcon />}
            onClick={handleBulkUpload}
          />
        </footer>
      </main>
    </section>
  )
}

export default StudentBulkUpload
