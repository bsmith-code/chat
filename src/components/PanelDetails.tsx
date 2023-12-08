import { selectCurrentRoomId } from 'store/client'
import { useGetRoomsQuery } from 'store/server'

import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography
} from '@mui/material'

import { useAppSelector } from 'hooks/useRedux'

import { getFullName, getInitials } from 'utils'

export const PanelDetails = () => {
  const currentRoomId = useAppSelector(selectCurrentRoomId)
  const { currentRoom } = useGetRoomsQuery(undefined, {
    skip: !currentRoomId,
    selectFromResult: ({ data = [], ...restResult }) => ({
      currentRoom: data.find(({ id }) => id === currentRoomId),
      ...restResult
    })
  })

  const { name, members } = currentRoom ?? {}
  return (
    <Box component={Paper} flexBasis={400} overflow="auto" p={4}>
      <Box mb={4}>
        <Typography fontSize={14}>Room:</Typography>
        <Typography variant="h5">{name}</Typography>
      </Box>

      <Box>
        <Typography fontSize={14}>Members:</Typography>
        {members?.length ? (
          <List>
            {members.map(member => (
              <ListItem>
                <Avatar>{getInitials(member)}</Avatar>
                <ListItemText sx={{ ml: 2 }}>
                  {getFullName(member)}
                </ListItemText>
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography>No members available.</Typography>
        )}
      </Box>
    </Box>
  )
}
