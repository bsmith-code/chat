export interface IUser {
  id: string
  firstName: string
  lastName: string
  email: string
}

export interface IMessage {
  id: string
  message: string
  roomId: string
  userId: string
  createdAt: string
}

export interface IMessageCreate {
  message: string
  roomId: string
}

export interface IRoom {
  id: string
  name?: string
  members: IUser[]
  messages: IMessage[]
}

export interface IRoomForm {
  name?: string
  members: IUser[]
}
export interface IRoomCreate {
  name?: string
  members: string[]
}
