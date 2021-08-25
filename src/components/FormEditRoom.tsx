import { useState, FormEvent } from 'react'
import { useAppDispatch } from '../store'
import { createRoom, getUserRooms } from '../features/rooms'

type IProps = {
  toggleEditRoom: () => void
}

const FormEditRoom = ({ toggleEditRoom }: IProps): JSX.Element => {
  return <div>test</div>
}

export default FormEditRoom
