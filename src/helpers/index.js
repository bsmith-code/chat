import Cookies from 'js-cookie'

const getAccessToken = async () => {
  const accessToken = await Cookies.get('access_token')
  return accessToken
}

const handleError = error => {
  return error.response.data.message
}

export { getAccessToken, handleError }
