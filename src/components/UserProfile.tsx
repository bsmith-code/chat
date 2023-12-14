import { shallowEqual } from 'react-redux'

import { selectUser, useLogoutMutation } from 'store/server'

import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import { Avatar, Box, IconButton, Tooltip, Typography } from '@mui/material'

import { useAppSelector } from 'hooks/useRedux'

import { getUserFullName, getUserInitials } from 'utils'

export const UserProfile = () => {
  const [logout] = useLogoutMutation()

  const user = useAppSelector(selectUser, shallowEqual)
  const { email = '' } = user ?? {}

  const fullName = getUserFullName(user)
  const initials = getUserInitials(user)

  return (
    <Box display="flex" p={4} justifyContent="space-between">
      <Box display="flex" alignItems="center">
        <Avatar>{initials}</Avatar>
        <Box ml={3}>
          <Typography variant="subtitle2">{fullName}</Typography>
          <Typography fontSize={12}>{email}</Typography>
        </Box>
      </Box>
      <Tooltip title="Logout">
        <IconButton onClick={() => logout()}>
          <LogoutOutlinedIcon />
        </IconButton>
      </Tooltip>
    </Box>
  )
}
