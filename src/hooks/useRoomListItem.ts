import { shallowEqual } from 'react-redux'

import { selectCurrentRoomId, updateCurrentRoomId } from 'store/client'
import { selectUser } from 'store/server'

import { useAppDispatch, useAppSelector } from 'hooks/useRedux'

import { getRoomName } from 'utils'

import { IRoom } from 'types/room'

export const useRoomListItem = (room: IRoom) => {
  const dispatch = useAppDispatch()

  const currentUser = useAppSelector(selectUser, shallowEqual)
  const currentRoomId = useAppSelector(selectCurrentRoomId)

  const {
    id,
    name,
    members,
    message: { message, userId }
  } = room

  const isCurrentUser = userId === currentUser.id
  const isCurrentRoom = id === currentRoomId

  const memberName =
    members.find(member => member.id === userId)?.firstName ?? 'Deleted user'
  const preparedMembers = members.filter(
    ({ id: memberId }) => memberId !== currentUser.id
  )
  const preparedRoomName = getRoomName(preparedMembers, name)
  const preparedMessage = isCurrentUser
    ? `You: ${message}`
    : `${memberName}: ${message}`

  const handleClickRoom = () => {
    dispatch(updateCurrentRoomId(id))
  }

  return {
    message,
    isCurrentRoom,
    handleClickRoom,
    preparedMembers,
    preparedMessage,
    preparedRoomName
  }
}
