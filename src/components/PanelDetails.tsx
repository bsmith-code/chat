import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { shallowEqual } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'

import { selectCurrentRoomId } from 'store/client'
import {
  selectUser,
  useGetRoomsQuery,
  useUpdateRoomMutation
} from 'store/server'

import { Box, Paper } from '@mui/material'

import { useAppSelector } from 'hooks/useRedux'

import { PanelDetailsMembers } from 'components/PanelDetailsMembers'
import { PanelDetailsTextField } from 'components/PanelDetailsTextField'

import { roomSchema } from 'utils'

import { IRoomForm } from 'types/room'

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

  const { members = [] } = currentRoom ?? {}

  const form = useForm<IRoomForm>({
    defaultValues: currentRoom,
    resolver: yupResolver(roomSchema)
  })

  const handleResetForm = () => form.reset(currentRoom)
  const handleSubmit = form.handleSubmit(async (data: IRoomForm) => {
    await updateRoom(data)
    setFocusedField('')
  })

  useEffect(() => {
    handleResetForm()
  }, [currentRoomId])

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
      <PanelDetailsMembers
        form={form}
        members={members}
        onSubmit={handleSubmit}
        currentUser={currentUser}
      />
    </Box>
  )
}
