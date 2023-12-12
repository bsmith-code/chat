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
  name: string
  description: string
  members: IUser[]
  messages: IMessage[]
}

export interface IRoomForm {
  id?: string
  name: string
  description: string
  members: IUser[]
}
// export interface IRoomCreate {
//   name: string
//   description: string
//   members: string[]
// }

// export interface IRoomUpdate extends IRoomCreate {
//   id: string
// }
