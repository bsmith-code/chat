import { useDispatch } from 'react-redux'

import { updateCurrentTab } from 'store/client'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { Button, Toolbar, Typography } from '@mui/material'

import { TAB_DETAILS, TAB_ROOMS } from 'constants/tabs'

import { TTab } from 'types/app'

export const PanelMessagesToolbar = () => {
  const dispatch = useDispatch()

  const handleClick = (tab: TTab) => {
    dispatch(updateCurrentTab(tab))
  }

  return (
    <Toolbar sx={{ justifyContent: 'space-between' }} className="toolbar">
      <Button onClick={() => handleClick(TAB_ROOMS)}>
        <ArrowBackIcon />
        <Typography ml={1} variant="subtitle2">
          Rooms
        </Typography>
      </Button>
      <Button onClick={() => handleClick(TAB_DETAILS)}>
        <Typography mr={1} variant="subtitle2">
          Details
        </Typography>
        <ArrowForwardIcon />
      </Button>
    </Toolbar>
  )
}
