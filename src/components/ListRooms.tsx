import { Fragment } from 'react'
import { shallowEqual } from 'react-redux'

import { selectCurrentRoomId, updateCurrentRoomId } from 'store/client'
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
  const currentRoomId = useAppSelector(selectCurrentRoomId)

  const { data: rooms = [] } = useGetRoomsQuery(currentUser.id, {
    skip: !currentUser.id
  })

  const handleClickRoom = (id: string) => {
    dispatch(updateCurrentRoomId(id))
  }

  return rooms.length ? (
    <List>
      {rooms.map(({ id, name, members, message: { message, userId } = {} }) => {
        const isCurrentUser = userId === currentUser.id
        const isCurrentRoom = id === currentRoomId

        const memberName =
          members.find(member => member.id === userId)?.firstName ?? ''
        const preparedMembers = members.filter(
          ({ id: memberId }) => memberId !== currentUser.id
        )
        const preparedRoomName = getRoomName(preparedMembers, name)
        const preparedMessage = isCurrentUser
          ? `You: ${message}`
          : `${memberName}: ${message}`
        return (
          <Fragment key={`room-${id}`}>
            <ListItemButton
              onClick={() => handleClickRoom(id)}
              sx={{ bgcolor: isCurrentRoom ? 'grey.200' : '' }}
            >
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
                  {message ? preparedMessage : 'No new messages'}
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
