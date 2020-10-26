const initialState = {
  currentUser: null,
}

const authReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USER_STATUS':
      return {
        ...state,
        currentUser: action.payload.user,
      }

    default:
      return state
  }
}

export default authReducers
