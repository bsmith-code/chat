import { useEffect } from 'react'
import styled from 'styled-components'
import UserRooms from './UserRooms'
import RoomCurrent from './RoomCurrent'
import { socketAPI } from '../clients/'

const { connect } = socketAPI()
const Dashboard = (): JSX.Element => {
  useEffect(() => {
    // eslint-disable-next-line prettier/prettier
    (async () => {
      await connect()
    })()
  }, [])

  return (
    <Main>
      <UserRooms />
      <RoomCurrent />
    </Main>
  )
}

const Main = styled.main`
  display: flex;
  height: calc(100vh - 100px);
`

export default Dashboard
