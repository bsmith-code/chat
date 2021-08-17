import { useEffect, lazy, Suspense } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../store'
import { getRoomById, getRoomMemberStatus } from '../store/slices/roomsSlice'

const RoomJoin = lazy(() => import('./RoomJoin'))
const RoomMessages = lazy(() => import('./RoomMessages'))

const RoomCurrent = (): JSX.Element => {
  // Composition
  const dispatch = useAppDispatch()
  const { data: currentRoom } = useSelector(
    (state: any) => state.rooms.currentRoom
  )
  const { data: memberStatus } = useSelector(
    (state: any) => state.rooms.memberStatus
  )
  const currentRoomId = useSelector((state: any) => state.rooms.currentRoomId)

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
    <Suspense fallback={false}>
      {memberStatus?.acceptedAt ? (
        <RoomMessages currentRoom={currentRoom} />
      ) : (
        <RoomJoin currentRoom={currentRoom} />
      )}
    </Suspense>
  ) : (
    <p>Select a Room to start chatting!</p>
  )
}

export default RoomCurrent
