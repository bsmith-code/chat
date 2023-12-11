import { Fragment } from 'react'
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

import { getRoomName, getUserInitials } from 'utils'

export const ListRooms = () => {
  const dispatch = useAppDispatch()
  const currentUser = useAppSelector(selectUser, shallowEqual)

  const { data: rooms = [] } = useGetRoomsQuery(currentUser.id, {
    skip: !currentUser.id
  })

  const handleClickRoom = (id: string) => {
    dispatch(updateCurrentRoomId(id))
  }

  return rooms.length ? (
    <List>
      {rooms.map(({ id, name, members, messages }) => {
        const preparedMembers = members.filter(
          ({ id: memberId }) => memberId !== currentUser.id
        )
        const preparedRoomName = getRoomName(preparedMembers, name)
        return (
          <Fragment key={`room-${id}`}>
            <ListItemButton onClick={() => handleClickRoom(id)}>
              <AvatarGroup max={3} total={preparedMembers.length}>
                {preparedMembers.map(member => (
                  <Avatar key={`avatar-${member.id}`}>
                    {getUserInitials(member)}
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
          </Fragment>
        )
      })}
    </List>
  ) : (
    <Box p={3} textAlign="center">
      <Typography>Create a room to start chatting!</Typography>
    </Box>
  )
}
