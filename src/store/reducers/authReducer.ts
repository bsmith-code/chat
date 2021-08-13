const initialState = {
  currentUser: null
}

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'SET_CURRENT_USER':
      return {
        ...state,
        currentUser: payload.user
      }

    default:
      return state
  }
}

export default authReducer
