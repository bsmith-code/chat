import Cookies from 'js-cookie'

export const getAccessToken = (): string => {
  return Cookies.get('bms_access_token') ?? ''
}

export const handleError = (error: {
  response: { data: { message: string } }
}): string => {
  return error.response.data.message
}
