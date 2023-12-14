import { Controller } from 'react-hook-form'

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@mui/material'

import { useCreateRoom } from 'hooks/useCreateRoom'

import { InputMembers } from 'components/InputMembers'

export const RoomCreate = () => {
  const { form, handleCancel, handleSubmit, isCreatingRoom, handleOpenDialog } =
    useCreateRoom()
  const { control } = form

  return (
    <>
      <Box px={3}>
        <Button
          fullWidth
          variant="contained"
          sx={{ color: '#fff' }}
          onClick={handleOpenDialog}
        >
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
          <Button onClick={handleSubmit}>Create</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
