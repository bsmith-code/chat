import styled from 'styled-components'
import UserRooms from './UserRooms'
import RoomMessages from './RoomMessages'

const Dashboard = () => {
  return (
    <Main>
      <UserRooms />
      <RoomMessages />
    </Main>
  )
}

const Main = styled.main`
  display: flex;
  height: 100vh;
`

export default Dashboard
