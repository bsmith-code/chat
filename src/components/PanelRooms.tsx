import { Box, Paper } from '@mui/material'

import { ListRooms } from 'components/ListRooms'
import { RoomCreate } from 'components/RoomCreate'
import { UserProfile } from 'components/UserProfile'

export const PanelRooms = () => (
  <Box component={Paper} flexBasis={400} overflow="auto">
    <UserProfile />
    <RoomCreate />
    <ListRooms />
  </Box>
)
