import { useState } from 'react'
import styled from 'styled-components'
import { IRoom } from '../store/reducers/roomsReducer'
import ModalCreateRoom from './ModalCreateRoom'

type IProps = {
  rooms: IRoom[]
}

const Rooms = ({ rooms }: IProps): JSX.Element => {
  const [isCreateRoomActive, setIsCreateRoomActive] = useState(false)

  const toggleCreateRoom = () => {
    setIsCreateRoomActive(!isCreateRoomActive)
  }

  return (
    <>
      <button onClick={() => toggleCreateRoom()}>Create Room</button>
      {rooms.length > 0 ? (
        <>
          {rooms.map(room => (
            <Room key={room.id}>{room.name}</Room>
          ))}
        </>
      ) : (
        <div>Create a room to start chatting!</div>
      )}

      {isCreateRoomActive && (
        <ModalCreateRoom toggleCreateRoom={toggleCreateRoom} />
      )}
    </>
  )
}

const Room = styled.div`
  cursor: pointer;
  height: 64px;
`

export default Rooms
