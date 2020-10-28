import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Loader from 'react-loaders'
import styled from 'styled-components'
import { useToasts } from 'react-toast-notifications'
import { getAccessToken } from './helpers'
import { Login, Register, Dashboard } from './views'
import GuardedRoute from './components/layout/GuardedRoute'
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
        <LoaderWrapper>
          <Loader type="ball-grid-pulse" />
        </LoaderWrapper>
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

const LoaderWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

export default App
