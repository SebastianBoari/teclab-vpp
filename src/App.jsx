import { Routes, Route } from 'react-router'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Enrollment from '@/pages/Enrollment.jsx'
import {WelcomeStep, StudentStep, SelectGroupStep} from '@/features/enrollment'
import '@/styles/index.css'

const queryClient = new QueryClient()

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <Routes>
          <Route path="inscripcion" element={<Enrollment/>}>
            <Route index element={<WelcomeStep />} />
            <Route path="alumno" element={<StudentStep />} />
            <Route path="grupos/:dni" element={<SelectGroupStep />} />
          </Route>
        </Routes>
      </QueryClientProvider>
    </>
  )
}

export default App
