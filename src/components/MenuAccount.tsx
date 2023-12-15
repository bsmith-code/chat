import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import LightModeIcon from '@mui/icons-material/LightMode'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  styled,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography
} from '@mui/material'

import { useMenu } from 'hooks/useMenu'
import { useTheme } from 'hooks/useTheme'

import { getUserInitials } from 'utils'

import {
  THEME_DARK_VALUE,
  THEME_LIGHT_VALUE,
  THEME_SYSTEM_VALUE
} from 'constants/theme'

import { TTheme } from 'types/app'
import { IUser } from 'types/room'

interface IProps {
  user: IUser
}

const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  textTransform: 'none',
  '> svg': {
    marginRight: `${theme.spacing(1)}`
  }
}))

export const MenuAccount = ({ user }: IProps) => {
  const userInitials = getUserInitials(user)
  const { currentTheme, handleUpdateTheme } = useTheme()
  const { isOpen, anchorEl, handleOpenMenu, handleCloseMenu } = useMenu()

  return (
    <>
      <Tooltip title="Account Settings">
        <IconButton onClick={handleOpenMenu}>
          <Avatar>{userInitials}</Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        open={isOpen}
        anchorEl={anchorEl}
        onClose={handleCloseMenu}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box component="li" p={3}>
          <Typography
            textTransform="uppercase"
            fontWeight={600}
            fontSize={12}
            letterSpacing={1}
            marginBottom={1}
          >
            Mode
          </Typography>
          <ToggleButtonGroup
            value={currentTheme}
            color="primary"
            exclusive
            onChange={(_, value) => handleUpdateTheme(value as TTheme)}
          >
            <StyledToggleButton value={THEME_LIGHT_VALUE}>
              <LightModeIcon />
              Light
            </StyledToggleButton>
            <StyledToggleButton value={THEME_SYSTEM_VALUE}>
              <SettingsBrightnessIcon /> System
            </StyledToggleButton>
            <StyledToggleButton value={THEME_DARK_VALUE}>
              <DarkModeOutlinedIcon /> Dark
            </StyledToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Menu>
    </>
  )
}
