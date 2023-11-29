import { ReactNode } from 'react'

import { Box } from '@mui/material'

import { LayoutAppFooter } from 'components/LayoutAppFooter'
import { LayoutAppHeader } from 'components/LayoutAppHeader'

interface IProps {
  children: ReactNode
}
export const LayoutDefault = ({ children }: IProps) => (
  <Box display="flex" flexDirection="column">
    <LayoutAppHeader />
    <Box
      zIndex={10}
      height="calc(100vh - 128px)"
      width="100%"
      sx={{
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundImage: `url('assets/view_page-bg.jpg')`,
        '&:after': {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: '-1',
          content: '""',
          display: 'block',
          position: 'absolute',
          background: 'rgba(255, 255, 255, 0.4)'
        }
      }}
    >
      {children}
    </Box>
    <LayoutAppFooter />
  </Box>
)
