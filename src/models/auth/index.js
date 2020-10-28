import API from '../../clients'
import { handleError } from '../../helpers'

const fetchUserStatus = async () => {
  try {
    const route = `/auth/status`
    const { data } = await API.get(route)

    return data
  } catch (error) {
    throw handleError(error)
  }
}

const loginUser = async ({ username, password }) => {
  try {
    const route = `/auth/login`
    const { data } = await API.post(route, { username, password })

    return data
  } catch (error) {
    throw handleError(error)
  }
}

const logoutUser = async () => {
  try {
    const route = `/auth/logout`
    const user = await API.post(route, {})

    return user
  } catch (error) {
    throw handleError(error)
  }
}

export { fetchUserStatus, loginUser, logoutUser }
