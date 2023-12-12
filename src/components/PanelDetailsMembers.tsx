import { BaseSyntheticEvent, MouseEvent, useState } from 'react'
import { useController, UseFormReturn } from 'react-hook-form'

import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  iconButtonClasses,
  List,
  ListItem,
  ListItemText,
  styled,
  Typography
} from '@mui/material'

import { InputMembers } from 'components/InputMembers'

import { getUserFullName, getUserInitials } from 'utils'

import { IRoomForm, IUser } from 'types/room'

interface IProps {
  form: UseFormReturn<IRoomForm>
  members: IUser[]
  onSubmit: (e: BaseSyntheticEvent) => Promise<void>
  currentUser: IUser
}

const StyledListItem = styled(ListItem)(() => ({
  [`.${iconButtonClasses.root}`]: {
    display: 'none'
  },
  '&:hover': {
    [`.${iconButtonClasses.root}`]: {
      display: 'inline-flex'
    }
  }
}))

export const PanelDetailsMembers = ({
  form,
  members,
  onSubmit,
  currentUser
}: IProps) => {
  const {
    field: { onChange }
  } = useController({ control: form.control, name: 'members' })

  const [isAddingMember, setIsAddingMember] = useState(false)

  const handleOpenDialog = () => {
    form.resetField('members')
    setIsAddingMember(true)
  }
  const handleCloseDialog = () => {
    setIsAddingMember(false)
  }

  const handleRemoveMember =
    (id: string) => async (e: MouseEvent<HTMLButtonElement>) => {
      const preparedMembers = members.filter(
        member => member.id !== id && member.id !== currentUser.id
      )

      onChange(preparedMembers)
      await onSubmit(e)
    }

  const handleAddMembers = async (e: MouseEvent<HTMLButtonElement>) => {
    await onSubmit(e)
    handleCloseDialog()
  }

  return (
    <>
      <Box>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography fontSize={14} variant="subtitle2">
            Members:
          </Typography>
          <IconButton onClick={handleOpenDialog}>
            <AddOutlinedIcon />
          </IconButton>
        </Box>

        {members?.length ? (
          <List>
            {members.map(member => (
              <StyledListItem key={`member-${member.id}`}>
                <Avatar>{getUserInitials(member)}</Avatar>
                <ListItemText sx={{ ml: 2 }}>
                  {getUserFullName(member)}
                </ListItemText>
                {currentUser.id !== member.id && members.length > 2 && (
                  <IconButton onClick={handleRemoveMember(member.id)}>
                    <DeleteOutlinedIcon />
                  </IconButton>
                )}
              </StyledListItem>
            ))}
          </List>
        ) : (
          <Typography>No members available.</Typography>
        )}
      </Box>
      <Dialog open={isAddingMember}>
        <DialogTitle>Add members</DialogTitle>
        <DialogContent sx={{ minWidth: '400px', overflow: 'visible' }}>
          <InputMembers form={form} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleAddMembers}>Add</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
