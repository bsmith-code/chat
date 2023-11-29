import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { App } from 'App'
import reportWebVitals from 'reportWebVitals'
import { lightTheme } from 'themes'

import store from 'store'

import CssBaseline from '@mui/material/CssBaseline'
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={lightTheme}>
        <StyledEngineProvider injectFirst>
          <CssBaseline />
          <App />
        </StyledEngineProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
