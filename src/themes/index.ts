import { createTheme } from '@mui/material'

export const lightTheme = createTheme({
  typography: {
    fontFamily: 'Open Sans',
    fontWeightMedium: 600
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#05c3f9'
    },
    secondary: {
      main: '#282826'
    }
  }
})
