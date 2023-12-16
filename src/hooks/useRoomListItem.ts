import { useEffect, useState } from 'react'
import { shallowEqual } from 'react-redux'
import { useIsFirstRender, usePrevious } from '@uidotdev/usehooks'
import dayjs from 'dayjs'

import { selectCurrentRoomId, updateCurrentRoomId } from 'store/client'
import { selectUser } from 'store/server'

import { useAppDispatch, useAppSelector } from 'hooks/useRedux'

import { getRoomName } from 'utils'

import { IRoom } from 'types/room'

export const useRoomListItem = (room: IRoom) => {
  const dispatch = useAppDispatch()

  const isFirstRender = useIsFirstRender()
  const currentUser = useAppSelector(selectUser, shallowEqual)
  const currentRoomId = useAppSelector(selectCurrentRoomId)

  const [showNotification, setShowNotification] = useState(false)

  const {
    id,
    name,
    members,
    message: { message, userId, roomId, createdAt }
  } = room

  const isCurrentUser = userId === currentUser.id
  const isCurrentRoom = id === currentRoomId

  const slicedMessage =
    message && message.length >= 40 ? `${message.slice(0, 40)}...` : message
  const memberName =
    members.find(member => member.id === userId)?.firstName ?? 'Deleted user'

  const preparedMembers = members.filter(
    ({ id: memberId }) => memberId !== currentUser.id
  )
  const preparedRoomName = getRoomName(preparedMembers, name)

  const preparedMessage = isCurrentUser
    ? `You: ${slicedMessage}`
    : `${memberName}: ${slicedMessage}`

  const preparedDate = dayjs().isSame(dayjs(createdAt), 'day')
    ? dayjs(createdAt).format('H:mm a')
    : dayjs(createdAt).format('MM/DD/YYYY')

  const handleClickRoom = () => {
    setShowNotification(false)
    dispatch(updateCurrentRoomId(id))
  }

  const nextCreatedAt = dayjs(createdAt).unix()
  const prevCreatedAt = usePrevious(dayjs(createdAt).unix())
  useEffect(() => {
    console.log('nextCreatedAt', nextCreatedAt)
    console.log('prevCreatedAt', prevCreatedAt)
    if (
      !isFirstRender &&
      roomId !== currentRoomId &&
      prevCreatedAt !== nextCreatedAt
    ) {
      setShowNotification(true)
    }
  }, [roomId, currentRoomId, nextCreatedAt, prevCreatedAt, isFirstRender])

  return {
    message,
    preparedDate,
    isCurrentRoom,
    handleClickRoom,
    preparedMembers,
    preparedMessage,
    preparedRoomName,
    showNotification
  }
}
