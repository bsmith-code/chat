import { useState } from 'react'
import { shallowEqual } from 'react-redux'

import { updateCurrentRoomId } from 'store/client'
import { selectUser, useGetRoomsQuery } from 'store/server'

import {
  Avatar,
  AvatarGroup,
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Typography
} from '@mui/material'

import { useAppDispatch, useAppSelector } from 'hooks/useRedux'

import { getInitials } from 'utils'

export const ListRooms = () => {
  const dispatch = useAppDispatch()
  const { data: rooms = [] } = useGetRoomsQuery()
  const currentUser = useAppSelector(selectUser, shallowEqual)

  const handleClickRoom = (id: string) => {
    dispatch(updateCurrentRoomId(id))
  }

  return rooms.length ? (
    <List>
      {rooms.map(({ id, name, members, messages }) => {
        const preparedMembers = members.filter(
          ({ id: memberId }) => memberId !== currentUser.id
        )
        const preparedRoomName =
          name || preparedMembers.map(({ firstName }) => firstName).join(', ')
        return (
          <>
            <ListItemButton
              key={`room-${id}`}
              onClick={() => handleClickRoom(id)}
            >
              <AvatarGroup max={3} total={preparedMembers.length}>
                {preparedMembers.map(member => (
                  <Avatar key={`avatar-${member.id}`}>
                    {getInitials(member)}
                  </Avatar>
                ))}
              </AvatarGroup>
              <ListItemText sx={{ ml: 2 }}>
                <Typography variant="subtitle2">{preparedRoomName}</Typography>
                <Typography>
                  {messages?.[0]?.message ?? 'No new messages'}
                </Typography>
              </ListItemText>
            </ListItemButton>
            <Divider />
          </>
        )
      })}
    </List>
  ) : (
    <Box p={3} textAlign="center">
      <Typography>Create a room to start chatting!</Typography>
    </Box>
  )
}
