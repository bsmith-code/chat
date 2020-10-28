const setAppNotification = msgObj => dispatch => {
  dispatch({ type: 'SET_APP_NOTIFICATION', payload: { msgObj } })
}

const setIsLoading = isLoading => dispatch => {
  dispatch({ type: 'SET_APP_IS_LOADING', payload: { isLoading } })
}

export default { setAppNotification, setIsLoading }
