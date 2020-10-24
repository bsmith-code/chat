import { fetchUserStatus } from '../models/auth'

const GET_USER_STATUS = 'GET_USER_STATUS'

const getUserStatus = () => async dispatch => {
  try {
    const user = await fetchUserStatus()
    dispatch({ type: GET_USER_STATUS, payload: user })
  } catch (error) {
    console.log(error)
  }
}

export default { getUserStatus }
