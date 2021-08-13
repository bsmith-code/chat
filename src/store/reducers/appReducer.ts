const initialState = {
  isLoading: false,
  appNotification: null
}

const appReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'SET_APP_NOTIFICATION':
      return {
        ...state,
        appNotification: payload.data
      }
    case 'SET_APP_IS_LOADING':
      return {
        ...state,
        isLoading: payload.isLoading
      }
    default:
      return state
  }
}

export default appReducer
