import * as yup from 'yup'

import { IUser } from 'types/room'

export const getUserFullName = ({ firstName, lastName }: IUser) =>
  `${firstName} ${lastName}`

export const getUserInitials = ({ firstName, lastName }: IUser) =>
  `${firstName?.slice(0, 1)}${lastName?.slice(0, 1)}`

export const getRoomName = (members: IUser[], name?: string) =>
  name || members.map(({ firstName }) => firstName).join(', ')

export const userSchema = yup.object({
  id: yup.string().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().required()
})
export const roomSchema = yup.object({
  name: yup.string().default(''),
  description: yup.string().default(''),
  members: yup.array(userSchema).min(1, 'Members are required.').required()
})
