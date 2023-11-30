import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { shallowEqual } from 'react-redux'

import { selectUser, useCreateRoomMutation } from 'store/server'

import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@mui/material'

import { useAppSelector } from 'hooks/useRedux'

export const RoomCreate = () => {
  const [createRoom] = useCreateRoomMutation()

  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: '',
      members: []
    }
  })

  const currentUser = useAppSelector(selectUser, shallowEqual)

  const [isCreatingRoom, setIsCreatingRoom] = useState(false)

  const handleOpenDialog = () => {
    setIsCreatingRoom(true)
  }
  const handleCloseDialog = () => {
    setIsCreatingRoom(false)
  }

  const onSubmit = async ({
    name,
    members
  }: {
    name: string
    members: string[]
  }) => {
    const preparedMembers = currentUser ? [...members, currentUser.id] : members

    await createRoom({ name, members: preparedMembers })
    handleCloseDialog()
  }

  return (
    <>
      <Box px={3}>
        <Button variant="contained" fullWidth onClick={handleOpenDialog}>
          Create room
        </Button>
      </Box>

      <Dialog open={isCreatingRoom} onClose={handleCloseDialog}>
        <DialogTitle>Create room</DialogTitle>
        <DialogContent sx={{ minWidth: '400px', overflow: 'visible' }}>
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Name"
                fullWidth
                sx={{ mb: 2 }}
                helperText={error?.message}
              />
            )}
          />

          <Autocomplete
            options={[]}
            renderInput={params => <TextField {...params} label="Members" />}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
          <Button onClick={handleSubmit(onSubmit)}>Create</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
