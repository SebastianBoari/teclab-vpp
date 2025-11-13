import { Outlet} from 'react-router'
import { EnrollmentProvider } from './context/EnrollmentProvider.jsx'

const EnrollmentContainer = () => {
  return (
    <div className="text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col min-h-screen justify-between p-6">
        <EnrollmentProvider>
          <Outlet/>
        </EnrollmentProvider>
      </div>
    </div>
  )
}

export default EnrollmentContainer