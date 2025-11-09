import { Outlet} from 'react-router'
import { EnrollmentProvider } from './context/EnrollmentProvider.jsx'

const EnrollmentContainer = () => {
  return (
    <EnrollmentProvider>
      <Outlet/>
    </EnrollmentProvider>
  )
}

export default EnrollmentContainer