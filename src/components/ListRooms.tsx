import { shallowEqual } from 'react-redux'

import { selectUser, useGetRoomsQuery } from 'store/server'

import { Box, List, Typography } from '@mui/material'

import { useAppSelector } from 'hooks/useRedux'

import { ListRoomItem } from 'components/ListRoomItem'

export const ListRooms = () => {
  const currentUser = useAppSelector(selectUser, shallowEqual)
  const { data: rooms = [] } = useGetRoomsQuery(currentUser.id, {
    skip: !currentUser.id
  })

  return rooms.length ? (
    <List>
      {rooms.map(room => (
        <ListRoomItem key={`room-${room.id}`} room={room} />
      ))}
    </List>
  ) : (
    <Box p={3} textAlign="center">
      <Typography>Create a room to start chatting!</Typography>
    </Box>
  )
}
