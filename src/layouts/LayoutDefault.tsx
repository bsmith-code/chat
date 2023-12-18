import { ReactNode } from 'react'

import { Box } from '@mui/material'

import { LayoutAppHeader } from 'components/LayoutAppHeader'

interface IProps {
  children: ReactNode
}
export const LayoutDefault = ({ children }: IProps) => (
  <Box width="100%" height="100dvh" display="flex" flexDirection="column">
    <LayoutAppHeader />
    {children}
  </Box>
)
