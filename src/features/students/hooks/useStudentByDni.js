import { useState, useEffect } from 'react'
import { getStudentByDni } from '../services/students.api.js'

const useStudentByDni = (dni) => {
    const [student, setStudent] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
      let isMounted = true

      async function loadStudent() {
        setLoading(true)
        setError(null)

        try {
          const data = await getStudentByDni(dni)
          if (isMounted) setStudent(data)
        } catch (err) {
          if (isMounted) setError(err.message || 'Error fetching student by dni')
        } finally {
          if (isMounted) setLoading(false)
        }
      }

      loadStudent()

      return () => { isMounted = false }
    }, [dni])
    
  return { student, loading, error }
}

export default useStudentByDni