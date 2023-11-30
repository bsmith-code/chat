import { useState } from 'react'
import { mockMessages, mockRooms } from '__mocks__/rooms'
import { LayoutDefault } from 'layouts/LayoutDefault'

import { useGetRoomsQuery, useSessionQuery } from 'store/server'

import EditIcon from '@mui/icons-material/Edit'
import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  IconButton,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Paper,
  TextField,
  Typography
} from '@mui/material'

import { ListRooms } from 'components/ListRooms'
import { RoomCreate } from 'components/RoomCreate'
import { UserProfile } from 'components/UserProfile'

export const App = () => {
  useSessionQuery()

  return (
    <LayoutDefault>
      <Box component={Paper} flexBasis={400} overflow="auto">
        <UserProfile />
        <RoomCreate />
        <ListRooms />
      </Box>
      <Box flexGrow={1} display="flex" flexDirection="column">
        <Box overflow="auto" p={2}>
          {mockMessages.map(({ id, message, user, createdAt }) => {
            const isOwnMessage = user.id === 'user-1'

            return (
              <Box
                key={`message-${id}`}
                component={Card}
                maxWidth="300px"
                mb={3}
                p={2}
                sx={theme =>
                  isOwnMessage
                    ? {
                        float: 'right',
                        color: 'white',
                        clear: 'both',
                        backgroundColor: theme.palette.primary.main
                      }
                    : {
                        backgroundColor: theme.palette.secondary.main,
                        clear: 'both'
                      }
                }
              >
                {message}
              </Box>
            )
          })}
        </Box>
        <Divider />
        <Box p={4} display="flex">
          <TextField fullWidth />
          <Button variant="contained">Submit</Button>
        </Box>
      </Box>
      <Box component={Paper} flexBasis={400} overflow="auto">
        Details
      </Box>
    </LayoutDefault>
  )
}
