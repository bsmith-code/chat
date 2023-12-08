import { IUser } from 'types/room'

export const getUserFullName = ({ firstName, lastName }: IUser) =>
  `${firstName} ${lastName}`

export const getUserInitials = ({ firstName, lastName }: IUser) =>
  `${firstName?.slice(0, 1)}${lastName?.slice(0, 1)}`

export const getRoomName = (members: IUser[], name?: string) =>
  name || members.map(({ firstName }) => firstName).join(', ')
