import { fetchUserStatus } from '../../models/auth'

const getUserStatus = () => async dispatch => {
  try {
    const user = await fetchUserStatus()
    dispatch({ type: 'GET_USER_STATUS', payload: { user } })
  } catch (error) {
    console.log(error)
  }
}

export default getUserStatus
