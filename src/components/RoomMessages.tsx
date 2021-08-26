import { FormEvent, useEffect, useState, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../store'
import { IMessage } from '../types'
import styled from 'styled-components'
import {
  createMessage,
  getRoomMessages,
  setRoomMessages
} from '../features/rooms'
import Message from './Message'
import { socketAPI } from '../clients'

const RoomMessages = (): JSX.Element => {
  // Composition
  const dispatch = useAppDispatch()
  const { currentRoom, roomMessages, isLoading } = useAppSelector(state => {
    const {
      rooms: {
        currentRoom: { data: currentRoom, isLoading: isCurrentRoomLoading },
        roomMessages: { data: roomMessages, isLoading: isRoomMessagesLoading }
      }
    } = state

    return {
      currentRoom,
      roomMessages,
      isLoading: isCurrentRoomLoading || isRoomMessagesLoading
    }
  })

  // Scroll To Bottom
  const messagesEnd = useRef<null | HTMLDivElement>(null)
  const scrollToBottom = () => {
    messagesEnd?.current?.scrollIntoView()
  }

  // Handle Input Change
  const [message, setMessage] = useState('')
  const handleInputChange = (event: KeyboardEvent) => {
    const { value } = event.target as HTMLInputElement

    setMessage(value)
  }

  //Handle Submit
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    await dispatch(createMessage(message))
    setMessage('')
  }

  // Get Room Messages
  useEffect(() => {
    // eslint-disable-next-line prettier/prettier
    (async () => {
      await dispatch(getRoomMessages())
      scrollToBottom()
    })()

    socketAPI().on('create-message', (message: IMessage) => {
      if (message.roomId === currentRoom.id) {
        dispatch(setRoomMessages(message))
      }
    })
  }, [])

  // Scroll to Bottom
  useEffect(() => {
    scrollToBottom()
  }, [roomMessages])

  return !isLoading ? (
    <>
      <Messages>
        {roomMessages.length ? (
          <>
            {roomMessages.map(message => (
              <Message key={`message-${message.id}`} messageObj={message} />
            ))}
            <MessagesEnd ref={messagesEnd}></MessagesEnd>
          </>
        ) : (
          <p>There are no messages in this room.</p>
        )}
      </Messages>
      <Footer>
        <SendMessageForm onSubmit={handleSubmit}>
          <SendMessage
            type="text"
            value={message}
            onInput={handleInputChange}
          />
        </SendMessageForm>
      </Footer>
    </>
  ) : (
    <div>Loading...</div>
  )
}

const Messages = styled.div`
  flex-grow: 1;
  overflow: auto;
  padding: 20px;
`
const MessagesEnd = styled.div``
const Footer = styled.div`
  padding: 12px;
`
const SendMessage = styled.input`
  background: var(--light-gray);
  border-radius: 22px;
  border: none;
  padding: 12px 12px 12px 30px;
`
const SendMessageForm = styled.form``

export default RoomMessages
