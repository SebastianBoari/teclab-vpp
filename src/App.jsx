import { Routes, Route } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '@features/auth'
import { WelcomeStep, StudentStep, SelectGroupStep, EnrollmentConfirmation, EnrollmentContainer, EnrollmentGuard } from '@features/enrollment'
import { PeriodsContainer } from '@features/periods'
import { AdminContainer, AdminPanel } from '@features/admin'
import { Login } from '@features/auth'
import NotFoundPage from '@common/pages/NotFoundPage'
import '@/styles/index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      retry: 1,
    },
    mutations: {
      retry: false,
    },
  },
})

const App = () => {

  return (
    <>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <ReactQueryDevtools />
            
            <Routes>
              <Route path="inscripcion" element={<EnrollmentContainer/>}>
                <Route index element={<WelcomeStep />} />
                <Route path="alumno" element={<StudentStep />} />
                <Route path="grupos" element={
                  <EnrollmentGuard>
                    <SelectGroupStep />
                  </EnrollmentGuard>} 
                />
                <Route path="confirmacion" element={
                  <EnrollmentGuard>
                    <EnrollmentConfirmation />
                  </EnrollmentGuard>} 
                />
              </Route>
              
              <Route path="admin" element={<AdminContainer/>}>
                <Route index element={<AdminPanel/>}/>
                <Route path='periodos' element={<PeriodsContainer/>}/>
              </Route>
              
              <Route path='login' element={<Login/>}/>

              <Route path="*" element={<NotFoundPage />} />
            </Routes>

            <Toaster />
          </AuthProvider>
        </QueryClientProvider>
    </>
  )
}

export default App
