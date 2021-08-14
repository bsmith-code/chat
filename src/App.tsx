import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router
} from 'react-router-dom'
import Styles from './styles'
import { getUserStatus } from './store/reducers/authReducer'
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
      path={path}
      exact={exact}
      render={() =>
        isAuthenticated ? <Component /> : <Redirect to="/login" />
      }
    />
  )
}

const App = (): JSX.Element => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)
  const { data: authenticatedUser } = useSelector(
    (state: any) => state.auth.authenticatedUser
  )

  useEffect(() => {
    const onCreate = async () => {
      setIsLoading(true)
      const accessToken = await getAccessToken()
      if (accessToken) {
        await dispatch(getUserStatus())
      }
      setIsLoading(false)
    }
    onCreate()
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
              isAuthenticated={!!authenticatedUser}
            />
            <Route path="/login" component={ViewLogin} />
            <Route path="/register" component={ViewRegister} />
          </Switch>
        </Router>
      )}
    </>
  )
}

export default App
