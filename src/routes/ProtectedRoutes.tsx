import { Switch, BrowserRouter as Router } from 'react-router-dom'
import LayoutProtected from '../components/LayoutProtected'
import ViewDashboard from '../components/ViewDashboard'

const ProtectedRoutes = (): JSX.Element => {
  return (
    <Router>
      <Switch>
        <LayoutProtected path="/" component={ViewDashboard} />
      </Switch>
    </Router>
  )
}

export default ProtectedRoutes
