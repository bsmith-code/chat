import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRoomMemberStatus } from '../store/slices/roomsSlice'
import styled from 'styled-components'

const RoomMessages = () => {
  // Composition
  const dispatch = useDispatch()
  const currentRoomId = useSelector((state: any) => state.rooms.currentRoomId)

  // Get User Rooms on Create
  useEffect(() => {
    if (currentRoomId) {
      // eslint-disable-next-line prettier/prettier
      (async () => {
        await dispatch(getRoomMemberStatus(currentRoomId))
      })()
    }
  }, [currentRoomId])

  return <Wrapper>Test</Wrapper>
}

const Wrapper = styled.section`
  height: 100%;
  flex-grow: 1;
`

export default RoomMessages
