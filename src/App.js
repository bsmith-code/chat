import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'
import GuardedRoute from './components/GuardedRoute'
import { Login, Register, Dashboard } from './views'
import Styles from './styles'

const App = () => {
  return (
    <Provider store={store}>
      <Styles />
      <Router>
        <Switch>
          <GuardedRoute exact path="/" component={Dashboard} isAuthenticated={false} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </Router>
    </Provider>
  )
}

export default App
