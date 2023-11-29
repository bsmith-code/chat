import { createTheme } from '@mui/material'

export const lightTheme = createTheme({
  typography: {
    // fontSize: 12,
    fontFamily: 'Open Sans',
    fontWeightMedium: 600
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#7ebaeb'
    },
    secondary: {
      main: '#efefef'
    }
  }
})
