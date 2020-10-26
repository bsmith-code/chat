import Cookies from 'js-cookie'

const getAccessToken = async () => {
  const accessToken = await Cookies.get('access_token')
  return accessToken
}

export { getAccessToken }
