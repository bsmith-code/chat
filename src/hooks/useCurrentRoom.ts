import { shallowEqual } from 'react-redux'

import { selectCurrentRoomId } from 'store/client'
import { selectUser, useGetRoomsQuery } from 'store/server'

import { useAppSelector } from 'hooks/useRedux'

export const useCurrentRoom = () => {
  const currentUser = useAppSelector(selectUser, shallowEqual)
  const currentRoomId = useAppSelector(selectCurrentRoomId)

  const { currentRoom } = useGetRoomsQuery(currentUser.id, {
    skip: !currentRoomId || !currentUser.id,
    selectFromResult: ({ data = [], ...restResult }) => ({
      currentRoom: data.find(({ id }) => id === currentRoomId),
      ...restResult
    })
  })

  return {
    currentRoom,
    currentRoomId
  }
}
