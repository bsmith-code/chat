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
        <CreateRoomBtn id="create-room" onClick={() => toggleCreateRoom()}>
          <CreateRoomIcon className="material-icons">add</CreateRoomIcon>
        </CreateRoomBtn>
      </CreateWrapper>

      {!isLoading ? (
        <>
          {userRooms.length ? (
            <>
              {userRooms.map((room: IRoom) => (
                <Room
                  key={room.id}
                  onClick={() => dispatch(setCurrentRoom(room))}
                >
                  <RoomIcon className="material-icons-outlined">group</RoomIcon>
                  {room.name}
                </Room>
              ))}
            </>
          ) : null}
        </>
      ) : (
        <div>Loading...</div>
      )}

      {isCreateRoomActive && (
        <ModalCreateRoom toggleCreateRoom={toggleCreateRoom} />
      )}
    </Wrapper>
  )
}

const Wrapper = styled.section`
  height: 100%;
  flex-basis: 250px;
  flex-grow: 0;
  flex-shrink: 0;
  overflow: auto;
  background: var(--light-gray);
`
const CreateWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px 18px;
`
const CreateRoomBtn = styled.button`
  height: 40px;
  width: 40px;
  border-radius: 50%;
`
const CreateRoomIcon = styled.i``
const Room = styled.button`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 20px;
  width: 100%;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-bottom: 2px solid var(--light-gray);
`
const RoomIcon = styled.i`
  color: var(--blue);
  margin: 0 8px 0 0;
`

export default UserRooms
