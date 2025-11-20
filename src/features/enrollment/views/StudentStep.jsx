import { useState } from 'react'
import { useNavigate } from 'react-router'
import Header from '@common/layout/Header'
import Button from '@components/Button'
import { useEnrollmentContext } from '../hooks/useEnrollmentContext'
import { useStudentByDni } from '@/features/students'
import { useEffect } from 'react'
import { notify } from '@utils/notify.utils'
import Spinner from '@components/Spinner'

const DNI_REGEX = /^\d{7,8}$/

const StudentStep = () => {
  const navigate = useNavigate()
  const [dni, setDni] = useState('')
  const isDniValid = DNI_REGEX.test(dni)

  const { studentDni, setStudentDni, setStudentData } = useEnrollmentContext()

  const prevStep = () => {
    setStudentDni('')
    setStudentData([])
    navigate('/inscripcion')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if(!isDniValid) return
    setStudentDni(dni)
  }

  const { 
    data: student,
    error: studentError,
    isSuccess: isStudentSuccess,
    isError: isStudentError, 
    isLoading: isStudentLoading 
  } = useStudentByDni(studentDni)

  useEffect(() => {
    if(isStudentError){
      notify('error', studentError.message || 'Ha ocurrido un error.')
    }

    if(isStudentLoading){
      <Spinner/>
    } 

    if(isStudentSuccess){
      if(studentDni){
        setStudentData(student)
        navigate('/inscripcion/grupos')
      }
    }
  },[
    student, 
    studentDni, 
    setStudentDni, 
    setStudentData, 
    isStudentError, 
    isStudentLoading, 
    studentError, 
    navigate, 
    isStudentSuccess
  ])
  
  return (
    <>
      <Header onBack={prevStep}/>

      <form onSubmit={handleSubmit} id="dni-form" className="flex flex-col items-center text-center">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Ingresa tu DNI
          </h1>

          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Para continuar, por favor ingresa tu número de documento sin espacios, comas o puntos.
          </p>

          <div className="relative">
            <input
              id="dni-input"
              value={dni}
              onChange={(e) => setDni(e.target.value.replace(/\D/g, ''))}
              type="tel"
              inputMode="numeric"
              placeholder="Ej. 28456789"
              maxLength={8}
              className="w-full px-4 py-4 text-center bg-gray-100 dark:bg-gray-800 border-2 border-transparent rounded-lg text-gray-900 dark:text-white transition duration-200 focus:border-primary focus:outline-none focus:ring-0"
            />
          </div>
        </div>
      </form>

      <footer className="w-full max-w-sm mx-auto">
        <Button 
          disabled={!isDniValid || isStudentLoading} 
          message={'Continuar'} 
          type={'submit'} 
          form={'dni-form'}
        />
      </footer>
    </>
  )
}

export default StudentStep