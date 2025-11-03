import { Routes, Route } from 'react-router'
import Enrollment from '@/pages/Enrollment.jsx'
import {WelcomeStep, StudentStep, SelectGroupStep} from '@/features/enrollment'
import '@/styles/index.css'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="inscripcion" element={<Enrollment/>}>
          <Route index element={<WelcomeStep />} />
          <Route path="alumno" element={<StudentStep />} />
          <Route path="grupos" element={<SelectGroupStep />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
