import { Box, Button, TextField } from '@mui/material'

import { useRoomMessages } from 'hooks/useRoomMessages'

export const PanelMessagesCreate = () => {
  const { userMessage, handleInputMessage, handleSubmitMessage } =
    useRoomMessages()

  return (
    <Box p={4} display="flex" component="form" onSubmit={handleSubmitMessage}>
      <TextField
        fullWidth
        autoComplete="off"
        onChange={handleInputMessage}
        value={userMessage}
      />
      <Button
        variant="contained"
        type="submit"
        sx={{ flexShrink: 0, ml: 2, color: '#fff' }}
      >
        Submit
      </Button>
    </Box>
  )
}
