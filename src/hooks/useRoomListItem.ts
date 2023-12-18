import { useEffect, useRef, useState } from 'react'
import { shallowEqual } from 'react-redux'
import dayjs from 'dayjs'

import {
  selectCurrentRoomId,
  updateCurrentRoomId,
  updateCurrentTab
} from 'store/client'
import { selectUser } from 'store/server'

import { useAppDispatch, useAppSelector } from 'hooks/useRedux'

import { getRoomName, shortenString } from 'utils'

import { TAB_MESSAGES } from 'constants/tabs'

import { IRoom } from 'types/room'

export const useRoomListItem = (room: IRoom) => {
  const dispatch = useAppDispatch()

  const currentUser = useAppSelector(selectUser, shallowEqual)
  const currentRoomId = useAppSelector(selectCurrentRoomId)

  const prevCreatedAt = useRef<number | null>(null)
  const [showNotification, setShowNotification] = useState(false)

  const { id, name, members, message: roomMessage } = room ?? {}
  const { message, userId, createdAt } = roomMessage ?? {}

  const isCurrentUser = userId === currentUser.id
  const isCurrentRoom = id === currentRoomId

  const memberName =
    members.find(member => member.id === userId)?.firstName ?? 'Deleted user'

  const preparedMembers = members.filter(
    ({ id: memberId }) => memberId !== currentUser.id
  )
  const preparedRoomName = getRoomName(preparedMembers, name)

  const preparedMessage = message
    ? shortenString(
        isCurrentUser ? `You: ${message}` : `${memberName}: ${message}`,
        30
      )
    : 'No new messages'

  const preparedDate = dayjs().isSame(dayjs(createdAt), 'day')
    ? dayjs(createdAt).format('H:mm a')
    : dayjs(createdAt).format('MM/DD/YYYY')

  const handleClickRoom = () => {
    prevCreatedAt.current = null
    setShowNotification(false)
    dispatch(updateCurrentTab(TAB_MESSAGES))
    dispatch(updateCurrentRoomId(id))
  }

  const nextCreatedAt = createdAt ? dayjs(createdAt).unix() : 0

  useEffect(() => {
    if (
      !isCurrentRoom &&
      prevCreatedAt.current &&
      prevCreatedAt.current !== nextCreatedAt
    ) {
      setShowNotification(true)
    }

    prevCreatedAt.current = nextCreatedAt
  }, [isCurrentRoom, nextCreatedAt, prevCreatedAt])

  return {
    preparedDate,
    isCurrentRoom,
    handleClickRoom,
    preparedMembers,
    preparedMessage,
    preparedRoomName,
    showNotification
  }
}
