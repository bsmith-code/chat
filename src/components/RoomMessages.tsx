import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store'
import { IRoom } from '../types'
import styled from 'styled-components'
import { getRoomMembers, getRoomMessages } from '../features/rooms/roomsThunks'
interface IProps {
  currentRoom: IRoom
}

const RoomMessages = ({ currentRoom }: IProps) => {
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

  // Get Room Data
  useEffect(() => {
    const getRoomData = async () => {
      Promise.all([
        dispatch(getRoomMembers(currentRoom?.id ?? '')),
        dispatch(getRoomMessages(currentRoom?.id ?? ''))
      ])
    }
    getRoomData()
  }, [])

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
              <div key={`message-${message.id}`}>{JSON.stringify(message)}</div>
            ))}
          </>
        ) : (
          <p>There are no messages in this room.</p>
        )}
      </Messages>
      <Footer>
        <CreateMessage type="text" />
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
`
const Footer = styled.div`
  padding: 12px;
`
const CreateMessage = styled.input`
  background: var(--light-gray);
  border-radius: 22px;
  border: none;
  padding: 12px 12px 12px 30px;
`

export default RoomMessages
