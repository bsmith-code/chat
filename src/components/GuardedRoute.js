import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const GuardedRoute = ({ component: Component, currentUser, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => (currentUser ? <Component {...props} /> : <Redirect to="/login" />)}
    />
  )
}

export default GuardedRoute
