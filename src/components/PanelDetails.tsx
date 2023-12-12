import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { shallowEqual } from 'react-redux'

import { selectCurrentRoomId } from 'store/client'
import {
  selectUser,
  useGetRoomsQuery,
  useUpdateRoomMutation
} from 'store/server'

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import {
  Avatar,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  outlinedInputClasses,
  Paper,
  styled,
  TextField,
  Typography
} from '@mui/material'

import { useAppSelector } from 'hooks/useRedux'

import { getUserFullName, getUserInitials } from 'utils'

import { IRoomForm } from 'types/room'

import { PanelDetailsTextField } from './PanelDetailsTextField'

export const PanelDetails = () => {
  const currentUser = useAppSelector(selectUser, shallowEqual)
  const currentRoomId = useAppSelector(selectCurrentRoomId)

  const [updateRoom] = useUpdateRoomMutation()
  const { currentRoom } = useGetRoomsQuery(currentUser.id, {
    skip: !currentRoomId || !currentUser.id,
    selectFromResult: ({ data = [], ...restResult }) => ({
      currentRoom: data.find(({ id }) => id === currentRoomId),
      ...restResult
    })
  })

  const [focusedField, setFocusedField] = useState('')

  const { id, name, description, members } = currentRoom ?? {}
  const form = useForm<IRoomForm>({
    defaultValues: {
      id,
      name,
      members,
      description
    }
  })

  const handleSubmit = form.handleSubmit(async (data: IRoomForm) => {
    await updateRoom(data)
    setFocusedField('')
  })

  return (
    <Box component={Paper} flexBasis={400} overflow="auto" p={4}>
      <PanelDetailsTextField
        form={form}
        name="name"
        label="Name:"
        onSubmit={handleSubmit}
        focusedField={focusedField}
        setFocusedField={setFocusedField}
      />
      <PanelDetailsTextField
        form={form}
        name="description"
        label="Description:"
        onSubmit={handleSubmit}
        focusedField={focusedField}
        setFocusedField={setFocusedField}
      />

      <Box>
        <Typography fontSize={14} variant="subtitle2">
          Members:
        </Typography>
        {members?.length ? (
          <List>
            {members.map(member => (
              <ListItem key={`member-${member.id}`}>
                <Avatar>{getUserInitials(member)}</Avatar>
                <ListItemText sx={{ ml: 2 }}>
                  {getUserFullName(member)}
                </ListItemText>
                <IconButton>
                  <DeleteOutlinedIcon />
                </IconButton>
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
