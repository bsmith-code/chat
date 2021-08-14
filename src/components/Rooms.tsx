import React from 'react'
import styled from 'styled-components'
import { IRoom } from '../store/reducers/roomsReducer'

const Rooms = ({ rooms }: { rooms: IRoom[] }): JSX.Element => {
  return rooms.length > 0 ? (
    <>
      {rooms.map(room => (
        <Room key={room.id}>{room.name}</Room>
      ))}
    </>
  ) : (
    <div>There are no rooms</div>
  )
}

const Room = styled.div`
  cursor: pointer;
  height: 64px;
`

export default Rooms
