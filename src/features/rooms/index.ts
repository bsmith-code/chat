import { roomsSlice } from './roomsSlice'

export * from './roomsThunks'
export const { setCurrentRoom, setRoomMessages } = roomsSlice.actions
export default roomsSlice.reducer
