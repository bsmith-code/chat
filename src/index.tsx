import React from 'react'
import ReactDOM from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary'
import { Provider } from 'react-redux'
import { App } from 'App'
import { SnackbarProvider } from 'notistack'
import reportWebVitals from 'reportWebVitals'
import { lightTheme } from 'themes'

import store from 'store'

import { Grow } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles'

import { AppErrorBoundary } from 'components/AppErrorBoundary'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <SnackbarProvider maxSnack={4} TransitionComponent={Grow}>
        <ThemeProvider theme={lightTheme}>
          <StyledEngineProvider injectFirst>
            <CssBaseline />
            <ErrorBoundary FallbackComponent={AppErrorBoundary}>
              <App />
            </ErrorBoundary>
          </StyledEngineProvider>
        </ThemeProvider>
      </SnackbarProvider>
    </Provider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
