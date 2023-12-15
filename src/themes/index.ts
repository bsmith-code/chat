import { createTheme } from '@mui/material'

import { TTheme } from 'types/app'

export const lightTheme = createTheme({
  typography: {
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

export const darkTheme = createTheme({
  typography: {
    fontFamily: 'Open Sans',
    fontWeightMedium: 600
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#7ebaeb'
    },
    secondary: {
      main: '#efefef'
    }
  }
})

export const getStoredTheme = () =>
  window.localStorage.getItem('theme') as TTheme

export const setStoredTheme = (theme: TTheme) =>
  window.localStorage.setItem('theme', theme)

export const getSystemPreference = () =>
  window.matchMedia(`(prefers-color-scheme: dark)`).matches
    ? darkTheme
    : lightTheme
