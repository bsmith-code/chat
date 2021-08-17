import styled from 'styled-components'
import UserRooms from './UserRooms'
import RoomCurrent from './RoomCurrent'

const Dashboard = (): JSX.Element => {
  return (
    <Main>
      <UserRooms />
      <RoomCurrent />
    </Main>
  )
}

const Main = styled.main`
  display: flex;
  height: calc(100vh - 80px);
`

export default Dashboard
