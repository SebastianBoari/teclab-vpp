import { useState } from 'react'
import Papa from 'papaparse'
import { studentRowSchema } from '../yup-scheme'
import useCareers from '@features/careers/hooks/useCareers'
import { notify } from '@common/utils/notify.utils'

const MAX_FILE_SIZE_MB = 5
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024
const MAX_STUDENTS_PER_UPLOAD = 100

const normalizeText = (text) => {
  if (!text) return ''
  return text
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

const useStudentBulkUpload = () => {
  const [file, setFile] = useState(null)
  const [errors, setErrors] = useState([])
  const [parsedStudents, setParsedStudents] = useState([])

  const { data: careers = [] } = useCareers()

  const clearFile = () => {
    setFile(null)
    setErrors([])
    setParsedStudents([])
  }

  const handleFileSelected = (selectedFile) => {
    if (selectedFile.type !== 'text/csv' && !selectedFile.name.endsWith('.csv')) {
      notify('error', 'El archivo debe ser formato CSV.')
      return
    }

    if (selectedFile.size > MAX_FILE_SIZE_BYTES) {
      notify('error', 'El archivo es demasiado grande. El máximo permitido es 5MB.')
      return
    }

    setFile(selectedFile)
    parseCSV(selectedFile)
  }

  const parseCSV = (fileToParse) => {
    Papa.parse(fileToParse, {
      header: true,
      skipEmptyLines: 'greedy',
      transformHeader: (header) => normalizeText(header), // Limpiamos headers
      complete: (results) => {
        processParsedData(results)
      },
      error: (error) => {
        console.error('Error crítico al leer el archivo CSV:', error)
        notify('error', 'Error al intentar leer el archivo CSV.')
        clearFile()
      },
    })
  }

  const processParsedData = (results) => {
    const rawRows = results.data
    const headers = results.meta.fields

    if (rawRows.length > MAX_STUDENTS_PER_UPLOAD) {
      notify('error', `El archivo debe contener un máximo de 100 alumnos.`)
      clearFile()
      return
    }

    const requiredHeaders = ['first_name', 'last_name', 'email', 'dni', 'career']
    const missingHeaders = requiredHeaders.filter((h) => !headers.includes(h))

    if (missingHeaders.length > 0) {
      notify(
        'error',
        `El CSV no tiene las columnas correctas. Faltan: ${missingHeaders.join(', ')}`
      )
      clearFile()
      return
    }

    const careersMap = new Map(
      careers.map((c) => [normalizeText(c.name), { id: c.id, name: c.name }])
    )

    const validStudents = []
    const errorRows = []
    const seenDNIs = new Set()

    rawRows.forEach((row, index) => {
      const rowNumber = index + 2 // +2 porque la fila 1 son los headers en el CSV

      try {
        const validatedData = studentRowSchema.validateSync(row, {
          abortEarly: false,
          stripUnknown: true,
          context: { seenDNIs },
        })

        const normalizedCsvCareer = normalizeText(validatedData.career)
        const matchedCareer = careersMap.get(normalizedCsvCareer)

        if (!matchedCareer) {
          throw new Error(`La carrera "${validatedData.career}" no existe.`)
        }

        validStudents.push({
          ...validatedData,
          career_id: matchedCareer.id,
          career: matchedCareer.name,
        })
      } catch (validationError) {
        const detailedErrors = validationError.inner
          ? validationError.inner.map((err) => err.message).join(' | ')
          : validationError.message

        errorRows.push({
          fileRow: rowNumber,
          errorMessage: detailedErrors,
        })
      }
    })

    setParsedStudents(validStudents)
    setErrors(errorRows)

    if (errorRows.length === 0 && validStudents.length > 0) {
      notify('success', 'Archivo procesado con éxito. Listo para subir.')
    }
  }

  return {
    file,
    errors,
    parsedStudents,
    handleFileSelected,
    clearFile,
  }
}

export default useStudentBulkUpload
