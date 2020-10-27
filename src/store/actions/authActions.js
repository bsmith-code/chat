import { fetchUserStatus, loginUser, logoutUser } from '../../models/auth'

const getUserStatus = () => async dispatch => {
  try {
    const user = await fetchUserStatus()
    dispatch({ type: 'SET_CURRENT_USER', payload: { user } })
  } catch (error) {
    console.log(error)
  }
}

const login = data => async dispatch => {
  try {
    const user = await loginUser(data)
    dispatch({ type: 'SET_CURRENT_USER', payload: { user } })
  } catch (error) {
    console.log(error)
  }
}

export default {
  login,
  getUserStatus,
}
