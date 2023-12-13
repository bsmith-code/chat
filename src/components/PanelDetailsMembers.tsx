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

import { usePanelDetailsContext } from 'context/PanelDetailsContext'

import { useUpdateMembers } from 'hooks/useUpdateMembers'

import { InputMembers } from 'components/InputMembers'

import { getUserFullName, getUserInitials } from 'utils'

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

export const PanelDetailsMembers = () => {
  const {
    members,
    isAddingMember,
    handleOpenDialog,
    handleAddMembers,
    handleCloseDialog,
    handleRemoveMember
  } = useUpdateMembers()
  const { form, currentUser } = usePanelDetailsContext()

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
