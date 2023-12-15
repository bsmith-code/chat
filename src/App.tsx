import { useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { shallowEqual } from 'react-redux'
import { LayoutDefault } from 'layouts/LayoutDefault'

import { selectCurrentRoomId, selectMuiTheme } from 'store/client'
import { useSessionQuery } from 'store/server'

import { Typography } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles'

import { useAppNotifications } from 'hooks/useAppNotifications'
import { useAppSelector } from 'hooks/useRedux'

import { AppErrorBoundary } from 'components/AppErrorBoundary'
import { PanelDetails } from 'components/PanelDetails'
import { PanelMessages } from 'components/PanelMessages'
import { PanelRooms } from 'components/PanelRooms'

const redirectUrl = encodeURI(
  `${process.env.REACT_APP_AUTH_BASE_URL ?? ''}?redirectUrl=${
    process.env.REACT_APP_CHAT_BASE_URL ?? ''
  }`
)
export const App = () => {
  useAppNotifications()
  const { data: user, isFetching } = useSessionQuery()

  const currentTheme = useAppSelector(selectMuiTheme, shallowEqual)
  const currentRoomId = useAppSelector(selectCurrentRoomId)

  useEffect(() => {
    if (!isFetching && !user) {
      window.location.assign(redirectUrl)
    }
  }, [user, isFetching])

  return (
    <ThemeProvider theme={currentTheme}>
      <StyledEngineProvider injectFirst>
        <CssBaseline />
        <ErrorBoundary FallbackComponent={AppErrorBoundary}>
          <LayoutDefault>
            {user ? (
              <>
                <PanelRooms />
                <PanelMessages />
                {currentRoomId && <PanelDetails />}
              </>
            ) : (
              <Typography>
                {isFetching ? 'Loading...' : 'Please login to continue'}
              </Typography>
            )}
          </LayoutDefault>
        </ErrorBoundary>
      </StyledEngineProvider>
    </ThemeProvider>
  )
}
