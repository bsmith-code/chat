import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { useCreateRoomMutation } from 'store/server'

import { roomSchema } from 'utils'

import { IRoomForm } from 'types/room'

export const useCreateRoom = () => {
  const [isCreatingRoom, setIsCreatingRoom] = useState(false)
  const [createRoom] = useCreateRoomMutation()

  const form = useForm<IRoomForm>({
    defaultValues: {
      name: '',
      description: '',
      members: []
    },
    resolver: yupResolver(roomSchema)
  })

  const handleOpenDialog = () => {
    setIsCreatingRoom(true)
  }
  const handleCancel = () => {
    setIsCreatingRoom(false)
    form.reset()
  }

  const handleSubmit = form.handleSubmit(async (data: IRoomForm) => {
    await createRoom(data)
    handleCancel()
  })

  return {
    form,
    handleCancel,
    handleSubmit,
    isCreatingRoom,
    handleOpenDialog
  }
}
