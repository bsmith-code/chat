import isPropValid from '@emotion/is-prop-valid'

import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  styled,
  TextField,
  Typography
} from '@mui/material'

import { useRoomMessages } from 'hooks/useRoomMessages'

import { PanelMessagesToolbar } from 'components/PanelMessagesToolbar'

import { getUserInitials } from 'utils'

const StyledMessage = styled(Box, { shouldForwardProp: isPropValid })<{
  isOwnMessage: boolean
}>(({ theme, isOwnMessage }) => ({
  maxWidth: '300px',
  display: 'flex',
  alignItems: 'flex-end',
  marginBottom: theme.spacing(3),

  ...(isOwnMessage
    ? {
        float: 'right',
        clear: 'both',
        '> .message': {
          color: 'white',
          borderBottomRightRadius: 0,
          backgroundColor: theme.palette.primary.main
        }
      }
    : {
        clear: 'both',
        float: 'left',
        '> .message': {
          borderBottomLeftRadius: 0,
          backgroundColor: theme.palette.action.selected
        }
      }),

  '.message': {
    padding: `${theme.spacing(1)} ${theme.spacing(2)}`
  },
  '.avatar': {
    width: 24,
    height: 24,
    fontSize: 12,
    fontWeight: 600,
    ...(isOwnMessage
      ? {
          marginLeft: theme.spacing(1)
        }
      : {
          order: -1,
          marginRight: theme.spacing(1)
        })
  }
}))

export const PanelMessages = () => {
  const {
    messages,
    messagesRef,
    userMessage,
    currentUser,
    currentRoomId,
    handleInputMessage,
    handleSubmitMessage
  } = useRoomMessages()

  return currentRoomId ? (
    <Box
      flexGrow={1}
      display="flex"
      className="messages"
      flexDirection="column"
    >
      <PanelMessagesToolbar />
      <Box overflow="auto" p={2} height="100%" ref={messagesRef}>
        {messages.length ? (
          messages.map(({ id, user, message, userId, createdAt }) => {
            const isOwnMessage = userId === currentUser.id

            return (
              <StyledMessage key={`message-${id}`} isOwnMessage={isOwnMessage}>
                <Card className="message">{message}</Card>
                <Avatar className="avatar">{getUserInitials(user)}</Avatar>
              </StyledMessage>
            )
          })
        ) : (
          <Typography>No messages.</Typography>
        )}
      </Box>
      <Divider />
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
    </Box>
  ) : (
    <Box
      flexGrow={1}
      display="flex"
      alignItems="center"
      className="messages"
      flexDirection="column"
      justifyContent="center"
    >
      <Typography>Select a room to start chatting!</Typography>
    </Box>
  )
}
