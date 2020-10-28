import { fetchRooms } from '../../models/room'

const getRooms = () => async dispatch => {
  try {
    const rooms = await fetchRooms()
    dispatch({ type: 'SET_ROOMS', payload: { rooms } })
  } catch (error) {
    dispatch({ type: 'SET_APP_NOTIFICATION', payload: { data: { type: 'error', message: error } } })
  }
}

export default {
  getRooms,
}
