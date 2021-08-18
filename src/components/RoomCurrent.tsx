import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store'
import RoomJoin from './RoomJoin'
import RoomMessages from './RoomMessages'
import { getRoomById, getRoomMemberStatus } from '../features/rooms/roomsThunks'

const RoomCurrent = (): JSX.Element => {
  // Composition
  const dispatch = useAppDispatch()
  const {
    isLoading,
    currentRoom,
    memberStatus,
    currentRoomId
  } = useAppSelector(state => {
    const {
      rooms: {
        currentRoomId,
        currentRoom: { data: currentRoom, isLoading: isCurrentRoomLoading },
        memberStatus: { data: memberStatus, isLoading: isMemberStatusLoading }
      }
    } = state

    return {
      currentRoom,
      memberStatus,
      currentRoomId,
      isLoading: isCurrentRoomLoading || isMemberStatusLoading
    }
  })

  // Get Room and Member Data
  useEffect(() => {
    if (currentRoomId) {
      const getRoomData = async () => {
        await Promise.all([
          dispatch(getRoomById(currentRoomId)),
          dispatch(getRoomMemberStatus(currentRoomId))
        ])
      }
      getRoomData()
    }
  }, [currentRoomId])

  return currentRoomId ? (
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
