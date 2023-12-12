import { BaseSyntheticEvent, MouseEvent } from 'react'
import { useController, UseFormReturn } from 'react-hook-form'

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import {
  Avatar,
  Box,
  IconButton,
  iconButtonClasses,
  List,
  ListItem,
  ListItemText,
  styled,
  Typography
} from '@mui/material'

import { getUserFullName, getUserInitials } from 'utils'

import { IRoomForm, IUser } from 'types/room'

interface IProps {
  form: UseFormReturn<IRoomForm>
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
  onSubmit,
  currentUser
}: IProps) => {
  const {
    field: { value: members, onChange }
  } = useController({ control: form.control, name: 'members' })

  const handleRemoveUser =
    (id: string) => async (e: MouseEvent<HTMLButtonElement>) => {
      if (id === currentUser.id) return

      const preparedMembers = members.filter(member => member.id !== id)

      onChange(preparedMembers)
      await onSubmit(e)
    }

  return (
    <Box>
      <Typography fontSize={14} variant="subtitle2">
        Members:
      </Typography>
      {members?.length ? (
        <List>
          {members.map(member => (
            <StyledListItem key={`member-${member.id}`}>
              <Avatar>{getUserInitials(member)}</Avatar>
              <ListItemText sx={{ ml: 2 }}>
                {getUserFullName(member)}
              </ListItemText>
              {currentUser.id !== member.id && (
                <IconButton onClick={handleRemoveUser(member.id)}>
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
  )
}
