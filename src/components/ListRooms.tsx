import { useState } from 'react'

import { useGetRoomsQuery } from 'store/server'

import {
  Divider,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography
} from '@mui/material'

export const ListRooms = () => {
  const { data: rooms = [] } = useGetRoomsQuery()
  const [selectedRoom, setSelectedRoom] = useState('')

  const handleClickRoom = (id: string) => {
    setSelectedRoom(id)
    // get rooms/{id}/messages
  }

  return (
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
  )
}
