import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { shallowEqual } from 'react-redux'

import {
  selectUser,
  useCreateRoomMutation,
  useGetUsersQuery
} from 'store/server'

import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ListItemButton,
  TextField
} from '@mui/material'

import { useAppSelector } from 'hooks/useRedux'

import { getUserFullName } from 'utils'

import { IRoomForm } from 'types/room'

export const RoomCreate = () => {
  const [isCreatingRoom, setIsCreatingRoom] = useState(false)
  const [createRoom] = useCreateRoomMutation()

  const currentUser = useAppSelector(selectUser, shallowEqual)
  const { users } = useGetUsersQuery(undefined, {
    skip: !isCreatingRoom,
    selectFromResult: ({ data = [] }) => ({
      users: data?.filter(({ id }) => id !== currentUser.id)
    })
  })

  const { control, handleSubmit, reset } = useForm<IRoomForm>({
    defaultValues: {
      name: '',
      description: '',
      members: []
    }
  })

  const handleOpenDialog = () => {
    setIsCreatingRoom(true)
  }
  const handleCloseDialog = () => {
    setIsCreatingRoom(false)
    reset()
  }

  const onSubmit = async (data: IRoomForm) => {
    await createRoom(data)
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

          <Controller
            name="members"
            control={control}
            render={({ field }) => (
              <Autocomplete
                multiple
                onChange={(_, value) => {
                  field.onChange(value)
                }}
                value={field.value}
                options={users}
                renderTags={(value, getTagProps) =>
                  value.map((user, index) => (
                    <Chip
                      label={getUserFullName(user)}
                      {...getTagProps({ index })}
                    />
                  ))
                }
                renderOption={(props, option) => (
                  <ListItemButton
                    {...props}
                    component="li"
                    key={`user-${option.id}`}
                    data-testid={`user-${option.id}`}
                  >
                    {getUserFullName(option)}
                  </ListItemButton>
                )}
                renderInput={params => (
                  <TextField {...params} label="Members" />
                )}
              />
            )}
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
