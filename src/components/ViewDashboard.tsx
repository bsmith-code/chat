import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import LoaderPage from './LoaderPage'
import Rooms from './Rooms'
import Messages from './Messages'
import actions from '../store/actions'

const Dashboard = () => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const rooms = useSelector(state => state.room.rooms)

  useEffect(() => {
    const getRooms = async () => {
      setIsLoading(true)
      await dispatch(actions.room.getRooms())
      setIsLoading(false)
    }
    getRooms()
  }, [])

  return isLoading ? (
    <LoaderPage />
  ) : (
    <DashboardMain>
      <DashboardRooms>
        <Rooms rooms={rooms} />
      </DashboardRooms>
      <DashboardMessages>
        <Messages />
      </DashboardMessages>
    </DashboardMain>
  )
}

const DashboardMain = styled.main`
  display: flex;
  height: 100vh;
`
const DashboardRooms = styled.section`
  height: 100%;
  width: 450px;
  background: var(--light-gray);
`
const DashboardMessages = styled.section`
  height: 100%;
  flex-grow: 1;
`

export default Dashboard
