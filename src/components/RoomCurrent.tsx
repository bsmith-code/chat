import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store'
import RoomJoin from './RoomJoin'
import RoomMessages from './RoomMessages'
import { getRoomMemberStatus } from '../features/rooms/roomsThunks'

const RoomCurrent = (): JSX.Element => {
  // Composition
  const dispatch = useAppDispatch()
  const { isLoading, currentRoom, memberStatus } = useAppSelector(state => {
    const {
      rooms: {
        currentRoom: { data: currentRoom, isLoading: isCurrentRoomLoading },
        memberStatus: { data: memberStatus, isLoading: isMemberStatusLoading }
      }
    } = state

    return {
      currentRoom,
      memberStatus,
      isLoading: isCurrentRoomLoading || isMemberStatusLoading
    }
  })

  // Get Room and Member Data
  useEffect(() => {
    if (currentRoom.id) {
      // eslint-disable-next-line prettier/prettier
      (async () => {
        await dispatch(getRoomMemberStatus())
      })()
    }
  }, [currentRoom.id])

  return currentRoom.id ? (
    <>
      {!isLoading ? (
        <>
          {!memberStatus.acceptedAt ? (
            <RoomJoin currentRoom={currentRoom} />
          ) : (
            <RoomMessages currentRoom={currentRoom} />
          )}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </>
  ) : (
    <p>Select a Room to start chatting!</p>
  )
}

export default RoomCurrent
