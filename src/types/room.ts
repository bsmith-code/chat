export interface IUser {
  id: string
  firstName: string
  lastName: string
  email: string
}

export interface IMessage {
  id: string
  message: string
  userId: string
  createdAt: string
}

export interface IMessageCreate {
  message: string
  roomId: string
}

export interface IRoom {
  id: string
  name: string
  members: IUser[]
  messages: IMessage[]
}
