import {
  Avatar,
  AvatarGroup,
  Divider,
  ListItemButton,
  ListItemText,
  Typography
} from '@mui/material'

import { useRoomListItem } from 'hooks/useRoomListItem'

import { getUserInitials } from 'utils'

import { IRoom } from 'types/room'

interface IProps {
  room: IRoom
}
export const ListRoomItem = ({ room }: IProps) => {
  const {
    message,
    isCurrentRoom,
    handleClickRoom,
    preparedMembers,
    preparedMessage,
    preparedRoomName
  } = useRoomListItem(room)

  return (
    <>
      <ListItemButton
        onClick={handleClickRoom}
        sx={{ bgcolor: isCurrentRoom ? 'grey.200' : '' }}
      >
        <AvatarGroup max={3} total={preparedMembers.length}>
          {preparedMembers.map(member => (
            <Avatar key={`avatar-${member.id}`}>
              {getUserInitials(member)}
            </Avatar>
          ))}
        </AvatarGroup>
        <ListItemText sx={{ ml: 2 }}>
          <Typography variant="subtitle2">{preparedRoomName}</Typography>
          <Typography>
            {message ? preparedMessage : 'No new messages'}
          </Typography>
        </ListItemText>
      </ListItemButton>
      <Divider />
    </>
  )
}
