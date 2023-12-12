import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { useCreateRoomMutation } from 'store/server'

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@mui/material'

import { IRoomForm } from 'types/room'

import { InputMembers } from './InputMembers'

export const RoomCreate = () => {
  const [isCreatingRoom, setIsCreatingRoom] = useState(false)
  const [createRoom] = useCreateRoomMutation()

  const form = useForm<IRoomForm>({
    defaultValues: {
      name: '',
      description: '',
      members: []
    }
  })
  const { control, handleSubmit, reset } = form

  const handleOpenDialog = () => {
    setIsCreatingRoom(true)
  }
  const handleCancel = () => {
    setIsCreatingRoom(false)
    reset()
  }

  const onSubmit = async (data: IRoomForm) => {
    await createRoom(data)
    handleCancel()
  }

  return (
    <>
      <Box px={3}>
        <Button variant="contained" fullWidth onClick={handleOpenDialog}>
          Create room
        </Button>
      </Box>

      <Dialog open={isCreatingRoom} onClose={handleCancel}>
        <DialogTitle>Create room</DialogTitle>
        <DialogContent sx={{ minWidth: '400px', overflow: 'visible' }}>
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Name (optional)"
                fullWidth
                sx={{ mb: 2 }}
                helperText={error?.message}
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Description (optional)"
                fullWidth
                sx={{ mb: 2 }}
                helperText={error?.message}
              />
            )}
          />

          <InputMembers form={form} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleSubmit(onSubmit)}>Create</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
