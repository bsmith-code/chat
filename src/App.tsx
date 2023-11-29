import { useState } from 'react'
import { mockMessages, mockRooms } from '__mocks__/rooms'
import { LayoutDefault } from 'layouts/LayoutDefault'

import {
  Box,
  Card,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Paper,
  Typography
} from '@mui/material'

export const App = () => {
  const [selectedRoom, setSelectedRoom] = useState('')

  const handleClickRoom = (id: string) => {
    setSelectedRoom(id)
    // get rooms/{id}/messages
  }

  return (
    <LayoutDefault>
      <Box component={Paper} flexBasis={400} overflow="auto">
        <Box>Current User</Box>
        <List>
          {mockRooms.map(({ id, name, members, messages }) => (
            <ListItemButton
              key={`room-${id}`}
              onClick={() => handleClickRoom(id)}
            >
              <ListItemAvatar>AG</ListItemAvatar>
              <ListItemText>
                <Typography variant="subtitle2">{name}</Typography>
                <Typography>{messages[0].message}</Typography>
              </ListItemText>
            </ListItemButton>
          ))}
        </List>
      </Box>
      <Box flexGrow={1} overflow="auto" p={2}>
        {mockMessages.map(({ id, message, userId, createdAt }) => {
          const isOwnMessage = userId === 'user-1'

          return (
            <Box
              key={`message-${id}`}
              component={Card}
              maxWidth="300px"
              mb={3}
              p={2}
              sx={
                isOwnMessage
                  ? {
                      float: 'right',
                      color: 'white',
                      backgroundColor: 'blue'
                    }
                  : {
                      backgroundColor: '#efefef',
                      clear: 'both'
                    }
              }
            >
              {message}
            </Box>
          )
        })}
      </Box>
      <Box component={Paper} flexBasis={400} overflow="auto">
        Details
      </Box>
    </LayoutDefault>
  )
}
