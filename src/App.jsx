import { Routes, Route } from 'react-router'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {WelcomeStep, StudentStep, SelectGroupStep, EnrollmentConfirmation, EnrollmentContainer} from '@/features/enrollment'
import { Toaster } from 'react-hot-toast'
import '@/styles/index.css'

const queryClient = new QueryClient()

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        
        <Routes>
          <Route path="inscripcion" element={<EnrollmentContainer/>}>
            <Route index element={<WelcomeStep />} />
            <Route path="alumno" element={<StudentStep />} />
            <Route path="grupos" element={<SelectGroupStep />} />
            <Route path="confirmacion" element={<EnrollmentConfirmation />} />
          </Route>
        </Routes>

        <Toaster />
      </QueryClientProvider>
    </>
  )
}

export default App
