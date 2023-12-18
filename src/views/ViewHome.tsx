import { useState } from 'react'
import isPropValid from '@emotion/is-prop-valid'

import { selectCurrentRoomId, selectCurrentTab } from 'store/client'

import { Box, styled } from '@mui/material'

import { useAppSelector } from 'hooks/useRedux'

import { PanelDetails } from 'components/PanelDetails'
import { PanelMessages } from 'components/PanelMessages'
import { PanelRooms } from 'components/PanelRooms'

const StyledViewHome = styled(Box, { shouldForwardProp: isPropValid })<{
  currentTab: 'rooms' | 'messages' | 'details'
}>(({ currentTab }) => ({
  '.rooms, .messages, .details': {
    '.toolbar': {
      display: 'none'
    }
  },
  '@media screen and (max-width: 1024px)': {
    '.rooms, .messages, .details': {
      display: 'none',
      flexGrow: 1,
      flexDirection: 'column',
      '.toolbar': {
        display: 'flex'
      }
    },
    [`.${currentTab}`]: {
      display: 'flex'
    }
  }
}))

export const ViewHome = () => {
  const currentTab = useAppSelector(selectCurrentTab)
  const currentRoomId = useAppSelector(selectCurrentRoomId)

  return (
    <StyledViewHome height="100%" display="flex" currentTab={currentTab}>
      <PanelRooms />
      <PanelMessages />
      {currentRoomId && <PanelDetails />}
    </StyledViewHome>
  )
}
