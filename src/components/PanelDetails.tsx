import { Box, Paper } from '@mui/material'

import { PanelDetailsContextProvider } from 'context/PanelDetailsContext'

import { PanelDetailsMembers } from 'components/PanelDetailsMembers'
import { PanelDetailsTextField } from 'components/PanelDetailsTextField'
import { PanelDetailsToolbar } from 'components/PanelDetailsToolbar'

export const PanelDetails = () => (
  <Box flexBasis={400} overflow="auto" component={Paper} className="details">
    <PanelDetailsToolbar />
    <Box p={4}>
      <PanelDetailsContextProvider>
        <PanelDetailsTextField name="name" label="Name:" />
        <PanelDetailsTextField name="description" label="Description:" />
        <PanelDetailsMembers />
      </PanelDetailsContextProvider>
    </Box>
  </Box>
)
