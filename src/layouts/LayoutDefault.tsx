import { ReactNode } from 'react'

import { Box } from '@mui/material'

interface IProps {
  children: ReactNode
}
export const LayoutDefault = ({ children }: IProps) => (
  <Box display="flex" width="100%" height="100vh">
    {children}
  </Box>
)
