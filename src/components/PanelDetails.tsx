import { Box, Paper } from '@mui/material'

import { PanelDetailsContextProvider } from 'context/PanelDetailsContext'

import { PanelDetailsMembers } from 'components/PanelDetailsMembers'
import { PanelDetailsTextField } from 'components/PanelDetailsTextField'

export const PanelDetails = () => (
  <Box component={Paper} flexBasis={400} overflow="auto" p={4}>
    <PanelDetailsContextProvider>
      <PanelDetailsTextField name="name" label="Name:" />
      <PanelDetailsTextField name="description" label="Description:" />
      <PanelDetailsMembers />
    </PanelDetailsContextProvider>
  </Box>
)
