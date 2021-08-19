import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../store'
import styled from 'styled-components'
import ModalCreateRoom from './ModalCreateRoom'
import { IRoom } from '../types'
import { getUserRooms, setCurrentRoom } from '../features/rooms'

const UserRooms = (): JSX.Element => {
  // Composition
  const dispatch = useAppDispatch()
  const { data: userRooms, isLoading } = useSelector(
    (state: any) => state.rooms.userRooms
  )

  // Get User Rooms on Create
  useEffect(() => {
    const onCreate = async () => {
      await dispatch(getUserRooms())
    }
    onCreate()
  }, [])

  // Create Room Modal
  const [isCreateRoomActive, setIsCreateRoomActive] = useState(false)
  const toggleCreateRoom = () => {
    setIsCreateRoomActive(!isCreateRoomActive)
  }

  return (
    <Wrapper>
      <CreateWrapper>
        My Rooms
        <CreateRoom id="create-room" onClick={() => toggleCreateRoom()}>
          <i className="material-icons">add</i>
        </CreateRoom>
      </CreateWrapper>

      {userRooms.length ? (
        <>
          {userRooms.map((room: IRoom) => (
            <Room key={room.id} onClick={() => dispatch(setCurrentRoom(room))}>
              {room.name}
            </Room>
          ))}
        </>
      ) : (
        <div>Create a room to start chatting!</div>
      )}

      {isCreateRoomActive && (
        <ModalCreateRoom toggleCreateRoom={toggleCreateRoom} />
      )}
    </Wrapper>
  )
}

const Wrapper = styled.section`
  height: 100%;
  width: 250px;
  background: var(--light-gray);
`
const CreateWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px 18px;
`
const CreateRoom = styled.button``
const Room = styled.button`
  display: block;
  cursor: pointer;
  height: 64px;
`

export default UserRooms
