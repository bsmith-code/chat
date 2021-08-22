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
const CreateRoom = styled.button`
  background: #e5e5e5;
  line-height: 1;
  height: 40px;
  width: 40px;
  border-radius: 50%;
`
const Room = styled.button`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 20px;
  line-height: 1;
  width: 100%;
  text-align: left;
  background: #e5e5e5;
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
