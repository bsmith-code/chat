import React from 'react'
import styled from 'styled-components'

const Rooms = ({ rooms }) => {
  return rooms.length > 0 ? rooms.map(room => <Room>{room.name}</Room>) : 'There are no rooms'
}

const Room = styled.div`
  cursor: pointer;
  height: 64px;
`

export default Rooms
