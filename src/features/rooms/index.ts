import { roomsSlice } from './roomsSlice'

export * from './roomsThunks'
export const { setCurrentRoomId } = roomsSlice.actions
export default roomsSlice.reducer
