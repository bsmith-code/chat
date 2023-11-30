import EditIcon from '@mui/icons-material/Edit'
import { Avatar, Box, IconButton, Typography } from '@mui/material'

import { IUser } from 'types/room'

interface IProps {
  user?: IUser
}
export const UserProfile = ({ user }: IProps) => {
  const { firstName = '', lastName = '', email = '' } = user ?? {}

  const fullName = `${firstName} ${lastName}`
  const initials = `${firstName?.slice(0, 1)}${lastName?.slice(0, 1)}`

  return (
    <Box display="flex" p={4} justifyContent="space-between">
      <Box display="flex" alignItems="center">
        <Avatar>{initials}</Avatar>
        <Box ml={3}>
          <Typography variant="subtitle2">{fullName}</Typography>
          <Typography fontSize={12}>{email}</Typography>
        </Box>
      </Box>
      <IconButton>
        <EditIcon />
      </IconButton>
    </Box>
  )
}
