import { useAppDispatch, useAppSelector } from '../store'
import { useEffect, useState } from 'react'
import { IRoom } from '../types'
import styled from 'styled-components'
import { getRoomMembers } from '../features/rooms'
import ModalEditRoom from './ModalEditRoom'

interface IProps {
  currentRoom: IRoom
}

const RoomDetails = ({ currentRoom }: IProps): JSX.Element => {
  // Composition
  const dispatch = useAppDispatch()
  const { roomMembers, isLoading } = useAppSelector(state => {
    const {
      rooms: {
        roomMembers: { data: roomMembers, isLoading }
      }
    } = state

    return {
      isLoading,
      roomMembers
    }
  })

  // Edit Room
  const [isEditRoomActive, setIsEditRoomActive] = useState(false)
  const toggleEditRoom = () => {
    setIsEditRoomActive(!isEditRoomActive)
  }

  // Get Member Status
  useEffect(() => {
    // eslint-disable-next-line prettier/prettier
    (async () => {
      await dispatch(getRoomMembers())
    })()
  }, [])

  return (
    <Header>
      <RoomInfo>
        <RoomName>{currentRoom.name}</RoomName>
        <RoomMembers>{roomMembers.accepted.length} members</RoomMembers>
      </RoomInfo>
      <EditRoomBtn>
        <EditRoomIcon
          className="material-icons"
          onClick={() => toggleEditRoom()}
        >
          edit
        </EditRoomIcon>
      </EditRoomBtn>

      {isEditRoomActive ? (
        <ModalEditRoom toggleEditRoom={toggleEditRoom} />
      ) : null}
    </Header>
  )
}

const Header = styled.div`
  border-bottom: 1px solid var(--light-gray);
  padding: 18px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`
const RoomInfo = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
`
const EditRoomBtn = styled.button`
  flex-grow: 0;
  flex-shrink: 0;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  margin: 0 0 0 20px;
`
const EditRoomIcon = styled.i``
const RoomName = styled.h1`
  margin: 0 0 10px 0;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
const RoomMembers = styled.p`
  margin: 0;
`
export default RoomDetails
