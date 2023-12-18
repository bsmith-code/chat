import { useDispatch } from 'react-redux'

import { updateCurrentTab } from 'store/client'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Button, Toolbar, Typography } from '@mui/material'

import { TAB_MESSAGES } from 'constants/tabs'

import { TTab } from 'types/app'

export const PanelDetailsToolbar = () => {
  const dispatch = useDispatch()

  const handleClick = (tab: TTab) => {
    dispatch(updateCurrentTab(tab))
  }

  return (
    <Toolbar sx={{ justifyContent: 'space-between' }} className="toolbar">
      <Button onClick={() => handleClick(TAB_MESSAGES)}>
        <ArrowBackIcon />
        <Typography ml={1} variant="subtitle2">
          Messages
        </Typography>
      </Button>
    </Toolbar>
  )
}
