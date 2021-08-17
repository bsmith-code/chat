import API from '../../clients'
import { handleError } from '../../helpers'
import { IRoom, IMember } from '../../types'

export const fetchRoomById = async (roomId: string): Promise<IRoom | void> => {
  try {
    const route = `/rooms/${roomId}`
    const { data } = await API.get(route)

    return data
  } catch (error) {
    handleError(error)
  }
}

export const fetchUserRooms = async (): Promise<IRoom[] | void> => {
  try {
    const route = `/rooms`
    const { data } = await API.get(route)

    return data
  } catch (error) {
    handleError(error)
  }
}

export const postCreateRoom = async (jsonData: {
  name: string
  users: string[]
}): Promise<{ room: IRoom; members: IMember[] } | void> => {
  try {
    const route = `/rooms`
    const { data } = await API.post(route, jsonData)

    return data
  } catch (error) {
    handleError(error)
  }
}

export const fetchRoomMessages = async (roomId: string) => {
  try {
    const route = `/rooms/${roomId}/messages`
    const { data } = await API.get(route)

    return data
  } catch (error) {
    handleError(error)
  }
}

export const fetchRoomMemberStatus = async (
  roomId: string
): Promise<IMember | void> => {
  try {
    const route = `/rooms/${roomId}/member-status`
    const { data } = await API.get(route)

    return data
  } catch (error) {
    handleError(error)
  }
}

export const putJoinRoom = async (roomId: string): Promise<IMember | void> => {
  try {
    const route = `rooms/${roomId}/join`
    const { data } = await API.put(route)

    return data
  } catch (error) {
    handleError(error)
  }
}
