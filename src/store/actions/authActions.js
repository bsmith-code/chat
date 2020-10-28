import { fetchUserStatus, loginUser, logoutUser } from '../../models/auth'

const getUserStatus = () => async dispatch => {
  try {
    const user = await fetchUserStatus()
    dispatch({ type: 'SET_CURRENT_USER', payload: { user } })
  } catch (error) {
    dispatch({ type: 'SET_APP_NOTIFICATION', payload: { data: { type: 'error', message: error } } })
  }
}

const login = data => async dispatch => {
  try {
    const user = await loginUser(data)
    dispatch({ type: 'SET_CURRENT_USER', payload: { user } })
  } catch (error) {
    dispatch({ type: 'SET_APP_NOTIFICATION', payload: { data: { type: 'error', message: error } } })
  }
}

const logout = () => async dispatch => {
  try {
    // await logoutUser()
    dispatch({ type: 'SET_CURRENT_USER', payload: { user: null } })
  } catch (error) {
    dispatch({ type: 'SET_APP_NOTIFICATION', payload: { data: { type: 'error', message: error } } })
  }
}

export default {
  login,
  logout,
  getUserStatus,
}
