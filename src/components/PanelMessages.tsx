import {
  ChangeEvent,
  ChangeEventHandler,
  FormEvent,
  useEffect,
  useRef,
  useState
} from 'react'
import { shallowEqual } from 'react-redux'
import { mockMessages } from '__mocks__/rooms'
import isPropValid from '@emotion/is-prop-valid'

import { selectCurrentRoomId } from 'store/client'
import {
  selectUser,
  useCreateMessageMutation,
  useGetRoomMessagesQuery
} from 'store/server'

import {
  Box,
  Button,
  Card,
  Divider,
  styled,
  TextField,
  Typography
} from '@mui/material'

import { useAppSelector } from 'hooks/useRedux'

const StyledCard = styled(Card, { shouldForwardProp: isPropValid })<{
  isOwnMessage: boolean
}>(({ theme, isOwnMessage }) => ({
  maxWidth: '300px',
  padding: theme.spacing(2),
  marginBottom: theme.spacing(3),
  ...(isOwnMessage
    ? {
        float: 'right',
        color: 'white',
        clear: 'both',
        borderBottomRightRadius: 0,
        backgroundColor: theme.palette.primary.main
      }
    : {
        float: 'left',
        borderBottomLeftRadius: 0,
        backgroundColor: theme.palette.secondary.main,
        clear: 'both'
      })
}))

export const PanelMessages = () => {
  const currentUser = useAppSelector(selectUser, shallowEqual)
  const currentRoomId = useAppSelector(selectCurrentRoomId)
  const { data: messages = [] } = useGetRoomMessagesQuery(currentRoomId, {
    skip: !currentRoomId
  })

  const messagesRef = useRef<HTMLDivElement | null>(null)
  const [userMessage, setUserMessage] = useState('')
  const [createMessage] = useCreateMessageMutation()

  const handleSubmitMessage = async (e: FormEvent) => {
    e.preventDefault()
    await createMessage({ message: userMessage, roomId: currentRoomId })
    setUserMessage('')
  }

  const handleInputMessage = (event: ChangeEvent<HTMLInputElement>) => {
    setUserMessage(event.target.value)
  }

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }
  }, [messages])

  return currentRoomId ? (
    <Box flexGrow={1} display="flex" flexDirection="column">
      <Box overflow="auto" p={2} height="100%" ref={messagesRef}>
        {messages.length ? (
          messages.map(({ id, message, userId, createdAt }) => {
            const isOwnMessage = userId === currentUser.id

            return (
              <StyledCard key={`message-${id}`} isOwnMessage={isOwnMessage}>
                {message}
              </StyledCard>
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
          onChange={handleInputMessage}
          value={userMessage}
        />
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Box>
    </Box>
  ) : (
    <Box
      flexGrow={1}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Typography>Select a room to start chatting!</Typography>
    </Box>
  )
}
