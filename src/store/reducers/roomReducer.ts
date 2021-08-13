const initialState = {
  rooms: []
}

const roomReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'SET_ROOMS':
      return {
        ...state,
        rooms: payload.rooms
      }

    default:
      return state
  }
}

export default roomReducer
