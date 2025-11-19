import { Outlet } from 'react-router'
import { AuthContainer } from '@/features/auth'

const AdminContainer = () => {
  return (
    <AuthContainer>
      <div className="text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col min-h-screen justify-between p-6">
          <Outlet/>
        </div>  
      </div>
    </AuthContainer>
  )
}

export default AdminContainer