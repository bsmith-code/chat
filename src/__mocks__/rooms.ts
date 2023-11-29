export const mockMessages = Array.from({ length: 20 }).map((_, idx) => ({
  id: `message-${idx}`,
  message: `This is message ${idx}`,
  userId: idx % 2 === 0 ? `user-1` : `user-2`,
  roomId: idx % 2 === 0 ? `room-1` : `room-2`,
  createdAt: new Date()
}))

export const mockMembers = Array.from({ length: 20 }).map((_, idx) => ({
  id: `user-${idx}`,
  firstName: `First ${idx}`,
  lastName: `Last ${idx}`,
  email: `email+${idx}@email.com`
}))

export const mockRooms = Array.from({ length: 20 }).map((_, idx) => ({
  id: `room-${idx}`,
  name: `Room ${idx}`,
  members: mockMembers,
  messages: mockMessages
}))
