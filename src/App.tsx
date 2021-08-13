import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router
} from 'react-router-dom'
import Styles from './styles'
import actions from './store/actions'
import { getAccessToken } from './helpers'
import LoaderPage from './components/LoaderPage'
import ViewLogin from './components/ViewLogin'
import ViewRegister from './components/ViewRegister'
import ViewDashboard from './components/ViewDashboard'

const GuardedRoute = ({
  path,
  exact,
  isAuthenticated,
  component: Component
}: {
  path: string
  exact: boolean
  isAuthenticated: boolean
  component: () => JSX.Element
}) => {
  return (
    <Route
      exact={exact}
      path={path}
      render={props =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  )
}

const App = () => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)
  const currentUser = useSelector(state => state.auth.currentUser)

  useEffect(() => {
    const getUserStatus = async () => {
      setIsLoading(true)
      const accessToken = await getAccessToken()
      if (accessToken) {
        await dispatch(actions.auth.getUserStatus())
      }
      setIsLoading(false)
    }
    getUserStatus()
  }, [])

  return (
    <>
      <Styles />
      {isLoading ? (
        <LoaderPage />
      ) : (
        <Router>
          <Switch>
            <GuardedRoute
              exact
              path="/"
              component={ViewDashboard}
              isAuthenticated={!!currentUser}
            />
            <Route path="/login" component={ViewLogin} />
            {/* <Route path="/register" component={ViewRegister} /> */}
          </Switch>
        </Router>
      )}
    </>
  )
}

export default App
