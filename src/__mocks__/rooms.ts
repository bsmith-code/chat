import { IMessage, IRoom, IUser } from 'types/room'

export const mockMessages: IMessage[] = Array.from({ length: 20 }).map(
  (_, idx) => ({
    id: `message-${idx}`,
    message: `This is message ${idx}`,
    user: {
      id: idx % 2 === 0 ? `user-1` : `user-2`,
      firstName: 'Mock First',
      lastName: 'Mock Last',
      email: `email+1@email.com`
    },
    createdAt: '2021-08-18T18:04:46.766Z'
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
  members: mockMembers,
  messages: mockMessages
}))
