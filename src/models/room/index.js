import API from '../../clients'
import { handleError } from '../../helpers'

export const fetchAllRooms = async () => {
  try {
    const route = `/rooms`
    const { data } = await API.get(route)

    return data
  } catch (error) {
    handleError(error)
  }
}

export const postCreateRoom = async jsonData => {
  try {
    const route = `/rooms`
    const { data } = await API.post(route, jsonData)

    return data
  } catch (error) {
    handleError(error)
  }
}

export const fetchRoomMessages = async roomId => {
  try {
    const route = `/rooms/${roomId}/messages`
    const { data } = await API.get(route)

    return data
  } catch (error) {
    handleError(error)
  }
}
