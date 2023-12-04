import { shallowEqual } from 'react-redux'

import { selectUser } from 'store/server'

import EditIcon from '@mui/icons-material/Edit'
import { Avatar, Box, IconButton, Typography } from '@mui/material'

import { useAppSelector } from 'hooks/useRedux'

import { getFullName, getInitials } from 'utils'

export const UserProfile = () => {
  const user = useAppSelector(selectUser, shallowEqual)
  const { email = '' } = user ?? {}

  const fullName = getFullName(user)
  const initials = getInitials(user)

  return (
    <Box display="flex" p={4} justifyContent="space-between">
      <Box display="flex" alignItems="center">
        <Avatar>{initials}</Avatar>
        <Box ml={3}>
          <Typography variant="subtitle2">{fullName}</Typography>
          <Typography fontSize={12}>{email}</Typography>
        </Box>
      </Box>
      {/* <IconButton>
        <EditIcon />
      </IconButton> */}
    </Box>
  )
}
