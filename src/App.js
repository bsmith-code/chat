import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Loader from 'react-loaders'
import styled from 'styled-components'
import { getAccessToken } from './helpers'
import { Login, Register, Dashboard } from './views'
import GuardedRoute from './components/GuardedRoute'
import Styles from './styles'
import actions from './store/actions'

const App = () => {
  const [isLoading, setIsLoading] = useState(true)
  const currentUser = useSelector(state => state.auth.currentUser)
  const dispatch = useDispatch()

  useEffect(() => {
    const getUserStatus = async () => {
      const accessToken = await getAccessToken()
      if (accessToken) {
        setIsLoading(true)
        await dispatch(actions.auth.getUserStatus())
        setIsLoading(false)
      }
    }
    getUserStatus()
  }, [])

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
