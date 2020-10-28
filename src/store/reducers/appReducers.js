const initialState = {
  isLoading: false,
  appNotificaion: {},
}

const appReducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'SET_APP_NOTIFICATION':
      return {
        ...state,
        appNotificaion: payload.msgObj,
      }
    case 'SET_APP_IS_LOADING':
      return {
        ...state,
        isLoading: payload.isLoading,
      }
    default:
      return state
  }
}

export default appReducers
