import { shallowEqual } from 'react-redux'

import { selectUser } from 'store/server'

import { Box, Divider, Toolbar, Typography } from '@mui/material'

import { useAppSelector } from 'hooks/useRedux'

import { MenuAccount } from 'components/MenuAccount'

export const LayoutAppHeader = () => {
  const currentUser = useAppSelector(selectUser, shallowEqual)

  return (
    <header>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography
          variant="subtitle1"
          color="primary"
          sx={{ fontWeight: 800 }}
        >
          Well Chat
        </Typography>

        {currentUser && (
          <Box display="flex">
            <MenuAccount user={currentUser} />
          </Box>
        )}
      </Toolbar>
      <Divider />
    </header>
  )
}
