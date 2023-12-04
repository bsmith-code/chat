import { useState } from 'react'

import { updateCurrentRoomId } from 'store/client'
import { useGetRoomsQuery } from 'store/server'

import {
  Box,
  Divider,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography
} from '@mui/material'

import { useAppDispatch } from 'hooks/useRedux'

export const ListRooms = () => {
  const dispatch = useAppDispatch()
  const { data: rooms = [] } = useGetRoomsQuery()

  const handleClickRoom = (id: string) => {
    dispatch(updateCurrentRoomId(id))
  }

  return rooms.length ? (
    <List>
      {rooms.map(({ id, name, members, messages }) => (
        <>
          <ListItemButton
            key={`room-${id}`}
            onClick={() => handleClickRoom(id)}
          >
            <ListItemAvatar>AG</ListItemAvatar>
            <ListItemText>
              <Typography variant="subtitle2">{name}</Typography>
              <Typography>
                {messages?.[0]?.message ?? 'No new messages'}
              </Typography>
            </ListItemText>
          </ListItemButton>
          <Divider />
        </>
      ))}
    </List>
  ) : (
    <Box p={3} textAlign="center">
      <Typography>Create a room to start chatting!</Typography>
    </Box>
  )
}
