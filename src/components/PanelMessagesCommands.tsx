import { shallowEqual } from 'react-redux'

import { selectCommands } from 'store/client'

import { Box } from '@mui/material'

import { useAppSelector } from 'hooks/useRedux'

export const PanelMessagesCommands = () => {
  const commands = useAppSelector(selectCommands, shallowEqual)
  const updatedCommand = commands.at(-1)

  return <Box position="absolute">{updatedCommand}</Box>
}
