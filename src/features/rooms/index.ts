import { roomsSlice } from './roomsSlice'

export * from './roomsThunks'
export const { setCurrentRoom } = roomsSlice.actions
export default roomsSlice.reducer
