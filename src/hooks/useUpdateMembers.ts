import { MouseEvent, useState } from 'react'

import { usePanelDetailsContext } from 'context/PanelDetailsContext'

type TEvent = MouseEvent<HTMLButtonElement>
export const useUpdateMembers = () => {
  const [isAddingMember, setIsAddingMember] = useState(false)
  const { membersField, currentRoom, currentUser, handleSubmit } =
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
    members,
    isAddingMember,
    handleOpenDialog,
    handleAddMembers,
    handleCloseDialog,
    handleRemoveMember
  }
}
