import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider, useSelector, useDispatch } from 'react-redux'
import Loader from 'react-loaders'
import { getAccessToken } from './helpers'
import { Login, Register, Dashboard } from './views'
import GuardedRoute from './components/GuardedRoute'
import Styles from './styles'
import actions from './redux/actions'
import store from './redux'

const App = async () => {
  const [isLoading, setIsLoading] = useState(false)
  const currentUser = useSelector(state => state.currentUser)
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
  })

  return isLoading ? (
    'test'
  ) : (
    // <Loader type="ball-grid-pulse" />
    <Provider store={store}>
      <Styles />
      <Router>
        <Switch>
          <GuardedRoute exact path="/" component={Dashboard} currentUser={currentUser} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </Router>
    </Provider>
  )
}

export default App
