import { useEffect, useState } from 'react'
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

import { getFullName } from 'utils'

import { IUser } from 'types/room'

interface IRoomForm {
  name: string
  members: IUser[]
}
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

  const onSubmit = async ({ name, members }: IRoomForm) => {
    await createRoom({ name, members: members.map(({ id }) => id) })
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
                getOptionLabel={user => getFullName(user)}
                renderTags={(value, getTagProps) =>
                  value.map((user, index) => (
                    <Chip
                      label={getFullName(user)}
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
                    {option.firstName}
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
