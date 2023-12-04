import { LayoutDefault } from 'layouts/LayoutDefault'

import { useSessionQuery } from 'store/server'

import { PanelDetails } from 'components/PanelDetails'
import { PanelMessages } from 'components/PanelMessages'
import { PanelRooms } from 'components/PanelRooms'

export const App = () => {
  useSessionQuery()

  return (
    <LayoutDefault>
      <PanelRooms />
      <PanelMessages />
      <PanelDetails />
    </LayoutDefault>
  )
}
