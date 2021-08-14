import API from '../../clients'
import { handleError } from '../../helpers'

const fetchAllRooms = async () => {
  try {
    const route = `/rooms`
    const { data } = await API.get(route)

    return data
  } catch (error) {
    handleError(error)
  }
}

const fetchMessages = async roomId => {
  try {
    const route = `/rooms/${roomId}/messages`
    const { data } = await API.get(route)

    return data
  } catch (error) {
    handleError(error)
  }
}

export { fetchAllRooms, fetchMessages }
