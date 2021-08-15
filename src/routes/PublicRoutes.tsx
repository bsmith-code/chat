import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import ViewLogin from '../components/ViewLogin'
import ViewRegister from '../components/ViewRegister'

const PublicRoutes = (): JSX.Element => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={ViewLogin} />
        <Route path="/register" component={ViewRegister} />
      </Switch>
    </Router>
  )
}

export default PublicRoutes
