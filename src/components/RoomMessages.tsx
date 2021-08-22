import { FormEvent, useEffect, useState, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../store'
import { IMessage, IRoom } from '../types'
import styled from 'styled-components'
import {
  createMessage,
  getRoomMembers,
  getRoomMessages,
  setRoomMessages
} from '../features/rooms'
import Message from './Message'
import { socketAPI } from '../clients'
interface IProps {
  currentRoom: IRoom
}

const RoomMessages = ({ currentRoom }: IProps): JSX.Element => {
  // Composition
  const dispatch = useAppDispatch()
  const { roomMembers, roomMessages, isLoading } = useAppSelector(state => {
    const {
      rooms: {
        roomMembers: { data: roomMembers, isLoading: isRoomMembersLoading },
        roomMessages: { data: roomMessages, isLoading: isRoomMessagesLoading }
      }
    } = state

    return {
      roomMembers,
      roomMessages,
      isLoading: isRoomMembersLoading || isRoomMessagesLoading
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

  // Get Room Data
  useEffect(() => {
    const getRoomData = async () => {
      await Promise.all([
        dispatch(getRoomMembers()),
        dispatch(getRoomMessages())
      ])
      scrollToBottom()
    }
    getRoomData()

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
    <Wrapper>
      <Header>
        <RoomName>{currentRoom.name}</RoomName>
        <RoomMembers>{roomMembers.length} members</RoomMembers>
      </Header>
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
    </Wrapper>
  ) : (
    <div>Loading...</div>
  )
}

const Wrapper = styled.section`
  height: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`
const Header = styled.div`
  border-bottom: 1px solid var(--light-gray);
  padding: 18px;
`
const RoomName = styled.h1`
  margin: 0 0 10px 0;
  font-weight: 600;
`
const RoomMembers = styled.p`
  margin: 0;
`
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
