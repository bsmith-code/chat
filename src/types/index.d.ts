export interface IRoom {
  id?: string
  name?: string
}

export interface IMember {
  id?: string
  userId?: string
  roomId?: string
  invitedAt?: string
  acceptedAt?: string | null
}

export interface IAuthenticatedUser {
  id?: string
  email?: string
  lastName?: string
  username?: string
  firstName?: string
}

export interface IMessage {
  id?: string
  roomId?: string
  memberId?: string
  createdAt?: string
  updatedAt?: string
}
