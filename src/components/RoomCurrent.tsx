import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../store'
import RoomJoin from './RoomJoin'
import RoomMessages from './RoomMessages'
import { getRoomById, getRoomMemberStatus } from '../store/slices/roomsSlice'

const RoomCurrent = (): JSX.Element => {
  // Composition
  const dispatch = useAppDispatch()
  const { isLoading, currentRoom, memberStatus, currentRoomId } = useSelector(
    (state: any) => {
      const {
        currentRoomId,
        currentRoom: { data: currentRoom, isLoading: isCurrentRoomLoading },
        memberStatus: { data: memberStatus, isLoading: isMemberStatusLoading }
      } = state.rooms
      return {
        currentRoom,
        memberStatus,
        currentRoomId,
        isLoading: isCurrentRoomLoading || isMemberStatusLoading
      }
    }
  )

  // Get User Rooms on Create
  useEffect(() => {
    if (currentRoomId) {
      // eslint-disable-next-line prettier/prettier
      (async () => {
        await Promise.all([
          dispatch(getRoomById(currentRoomId)),
          dispatch(getRoomMemberStatus(currentRoomId))
        ])
      })()
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
