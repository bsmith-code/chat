import API from '../../clients'
import { handleError } from '../../helpers'

const fetchMessages = async () => {
  try {
    const route = '/rooms'
    const { data } = await API.get(route)

    return data
  } catch (error) {
    handleError(error)
  }
}

export { fetchMessages }
