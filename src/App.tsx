import { LayoutDefault } from 'layouts/LayoutDefault'

import { selectCurrentRoomId } from 'store/client'
import { useSessionQuery } from 'store/server'

import { useAppSelector } from 'hooks/useRedux'

import { PanelDetails } from 'components/PanelDetails'
import { PanelMessages } from 'components/PanelMessages'
import { PanelRooms } from 'components/PanelRooms'

export const App = () => {
  useSessionQuery()
  const currentRoomId = useAppSelector(selectCurrentRoomId)

  return (
    <LayoutDefault>
      <PanelRooms />
      <PanelMessages />
      {currentRoomId && <PanelDetails />}
    </LayoutDefault>
  )
}
