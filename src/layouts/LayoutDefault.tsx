import { ReactNode } from 'react'

import { Box } from '@mui/material'

import { LayoutAppHeader } from 'components/LayoutAppHeader'

interface IProps {
  children: ReactNode
}
export const LayoutDefault = ({ children }: IProps) => (
  <>
    <LayoutAppHeader />
    <Box width="100%" height="calc(100vh - 64px)">
      {children}
    </Box>
  </>
)
