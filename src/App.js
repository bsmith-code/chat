import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useToasts } from 'react-toast-notifications'
import { getAccessToken } from './helpers'
import { Login, Register, Dashboard } from './views'
import GuardedRoute from './components/layout/GuardedRoute'
import PageLoader from './components/loaders/PageLoader'
import Styles from './styles'
import actions from './store/actions'

const App = () => {
  const { addToast } = useToasts()
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)
  const currentUser = useSelector(state => state.auth.currentUser)
  const appNotification = useSelector(state => state.app.appNotification)

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

  useEffect(() => {
    if (appNotification) {
      const { message, type } = appNotification
      addToast(message, {
        appearance: type,
        autoDismiss: true,
      })
      return () => {
        dispatch(actions.app.setAppNotification(null))
      }
    }
  }, [appNotification])

  return (
    <>
      <Styles />
      {isLoading ? (
        <PageLoader />
      ) : (
        <Router>
          <Switch>
            <GuardedRoute exact path="/" component={Dashboard} isAuthenticated={!!currentUser} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
        </Router>
      )}
    </>
  )
}

export default App
