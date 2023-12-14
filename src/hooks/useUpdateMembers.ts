import { MouseEvent, useState } from 'react'
import { shallowEqual } from 'react-redux'

import { selectUser } from 'store/server'

import { usePanelDetailsContext } from 'context/PanelDetailsContext'

import { useAppSelector } from 'hooks/useRedux'

type TEvent = MouseEvent<HTMLButtonElement>
export const useUpdateMembers = () => {
  const [isAddingMember, setIsAddingMember] = useState(false)

  const currentUser = useAppSelector(selectUser, shallowEqual)
  const { form, membersField, currentRoom, handleSubmit } =
    usePanelDetailsContext()

  const { field } = membersField
  const { members = [] } = currentRoom ?? {}

  const handleOpenDialog = () => {
    setIsAddingMember(true)
  }
  const handleCloseDialog = () => {
    setIsAddingMember(false)
  }

  const handleRemoveMember = (id: string) => async (e: TEvent) => {
    const preparedMembers = members.filter(
      member => member.id !== id && member.id !== currentUser.id
    )

    field.onChange(preparedMembers)
    await handleSubmit(e)
  }

  const handleAddMembers = async (e: TEvent) => {
    await handleSubmit(e)
    handleCloseDialog()
  }

  return {
    form,
    members,
    currentUser,
    isAddingMember,
    handleOpenDialog,
    handleAddMembers,
    handleCloseDialog,
    handleRemoveMember
  }
}
