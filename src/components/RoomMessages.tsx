import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../store'
import { IRoom } from '../types'
import styled from 'styled-components'

interface IProps {
  currentRoom: IRoom
}

const RoomMessages = ({ currentRoom }: IProps) => {
  return <Wrapper>Test</Wrapper>
}

const Wrapper = styled.section`
  height: 100%;
  flex-grow: 1;
`

export default RoomMessages
