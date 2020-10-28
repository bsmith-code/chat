import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ToastProvider } from 'react-toast-notifications'
import store from './store'
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastProvider>
        <App />
      </ToastProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
