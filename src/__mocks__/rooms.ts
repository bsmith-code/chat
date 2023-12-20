import { IMessage, IRoom, IUser } from 'types/room'

export const mockMessages: IMessage[] = Array.from({ length: 20 }).map(
  (_, idx) => ({
    id: `message-${idx}`,
    message: `This is message ${idx}`,
    userId: idx % 2 === 0 ? `user-1` : `user-2`,
    roomId: idx % 2 === 0 ? `room-1` : `room-2`,
    createdAt: '2021-08-18T18:04:46.766Z',
    user: {} as IUser,
    isCommand: false
  })
)

export const mockMembers: IUser[] = Array.from({ length: 20 }).map(
  (_, idx) => ({
    id: `user-${idx}`,
    firstName: `First ${idx}`,
    lastName: `Last ${idx}`,
    email: `email+${idx}@email.com`
  })
)

export const mockRooms: IRoom[] = Array.from({ length: 20 }).map((_, idx) => ({
  id: `room-${idx}`,
  name: `Room ${idx}`,
  description: `Room Description ${idx}`,
  members: mockMembers,
  message: mockMessages[0],
  updatedAt: '2023-12-16T12:36:58.000Z'
}))
