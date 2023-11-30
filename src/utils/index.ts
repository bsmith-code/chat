import { IUser } from 'types/room'

export const getFullName = ({ firstName, lastName }: IUser) =>
  `${firstName} ${lastName}`
export const getInitials = ({ firstName, lastName }: IUser) =>
  `${firstName?.slice(0, 1)}${lastName?.slice(0, 1)}`
