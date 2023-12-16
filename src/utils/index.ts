import * as yup from 'yup'

import { IMessage, IUser } from 'types/room'

export const getUserFullName = ({ firstName, lastName }: IUser) =>
  `${firstName} ${lastName}`

export const getUserInitials = ({ firstName, lastName }: IUser) =>
  `${firstName?.slice(0, 1)}${lastName?.slice(0, 1)}`

export const getRoomName = (members: IUser[], name?: string) => {
  const roomName = name || members.map(({ firstName }) => firstName).join(', ')
  const preparedRoomName =
    roomName.length > 30 ? `${roomName.slice(0, 30)}...` : roomName

  return preparedRoomName
}

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

const createNotification = (title: string, body: string) =>
  new Notification(title, { body })

export const showNotification = async (message: IMessage) => {
  if (!('Notification' in window)) {
    console.error('This browser does not support notifications.')
    return
  }
  const {
    user: { firstName }
  } = message

  if (Notification.permission === 'granted') {
    createNotification(`New message from ${firstName}`, message.message)
  } else if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission()

    if (permission === 'granted') {
      createNotification(`New message from ${firstName}`, message.message)
    }
  }
}

export const getAvatarStyles = (total: number) => ({
  [`&:nth-child(${total > 4 ? 1 : 4})`]: {
    left: 0,
    bottom: 0,
    width: '24px',
    height: '24px',
    zIndex: 4
  },
  [`&:nth-child(3)`]: {
    right: 0,
    top: 0,
    width: '26px',
    height: '26px',
    zIndex: 3
  },
  [`&:nth-child(2)`]: {
    right: 0,
    bottom: 0,
    width: '30px',
    height: '30px',
    zIndex: 2
  },
  [`&:nth-child(${total > 4 ? 4 : 1})`]: {
    left: 0,
    top: 0,
    width: '36px',
    height: '36px',
    zIndex: 1
  }
})
