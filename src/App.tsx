import { useEffect } from 'react'
import { LayoutDefault } from 'layouts/LayoutDefault'

import { selectCurrentRoomId } from 'store/client'
import { useSessionQuery } from 'store/server'

import { Typography } from '@mui/material'

import { useAppNotifications } from 'hooks/useAppNotifications'
import { useAppSelector } from 'hooks/useRedux'

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

  const currentRoomId = useAppSelector(selectCurrentRoomId)

  useEffect(() => {
    if (!isFetching && !user) {
      window.location.assign(redirectUrl)
    }
  }, [user, isFetching])

  return (
    <LayoutDefault>
      {user ? (
        <>
          <PanelRooms />
          <PanelMessages />
          {currentRoomId && <PanelDetails />}
        </>
      ) : (
        <Typography>Please login to continue</Typography>
      )}
    </LayoutDefault>
  )
}
