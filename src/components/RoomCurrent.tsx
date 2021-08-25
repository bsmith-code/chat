import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store'
import RoomJoin from './RoomJoin'
import RoomDetails from './RoomDetails'
import RoomMessages from './RoomMessages'
import { getRoomMemberStatus } from '../features/rooms'
import styled from 'styled-components'

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

  // Get Member Status
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
            <RoomWrapper>
              <RoomDetails currentRoom={currentRoom} />
              <RoomMessages currentRoom={currentRoom} />
            </RoomWrapper>
          )}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </>
  ) : (
    <CreateWrapper>
      <CreateTitle>Select or Create a Room to start chatting!</CreateTitle>
    </CreateWrapper>
  )
}

const CreateWrapper = styled.section`
  height: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  text-align: center;
  max-width: 420px;
  margin: 0 auto;
`
const RoomWrapper = styled.section`
  height: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`
const CreateTitle = styled.h1`
  margin: 0 0 20px 0;
  padding: 0;
  font-weight: 300;
  font-size: 28px;
`

export default RoomCurrent
