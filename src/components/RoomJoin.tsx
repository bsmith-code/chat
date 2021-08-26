import { useAppDispatch, useAppSelector } from '../store'
import styled from 'styled-components'
import { joinRoom, getRoomMemberStatus } from '../features/rooms'

const RoomJoin = (): JSX.Element => {
  // Composition
  const dispatch = useAppDispatch()
  const { currentRoom } = useAppSelector(state => {
    const {
      rooms: {
        currentRoom: { data: currentRoom }
      }
    } = state

    return {
      currentRoom
    }
  })

  const handleClick = async () => {
    await dispatch(joinRoom())
    await dispatch(getRoomMemberStatus())
  }

  return (
    <Wrapper>
      <JoinWrapper>
        <JoinTitle>
          You have been invited to join <strong>{currentRoom.name}</strong>.
        </JoinTitle>
        <JoinBtn onClick={handleClick}>Join Room</JoinBtn>
      </JoinWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  height: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  text-align: center;
`
const JoinWrapper = styled.div`
  max-width: 390px;
  margin: 0 auto;
  display: inline-block;
`
const JoinTitle = styled.h1`
  margin: 0 0 20px 0;
  padding: 0;
  font-weight: 300;
  font-size: 28px;
`
const JoinBtn = styled.button`
  background: var(--blue);
  color: var(--white);
  padding: 8px 24px;
  text-transform: uppercase;
  border-radius: 8px;
  font-family: var(--font-medium);
  font-size: 14px;
  flex-grow: 0;
`

export default RoomJoin
