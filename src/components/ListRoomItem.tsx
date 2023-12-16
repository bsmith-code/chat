import CircleIcon from '@mui/icons-material/Circle'
import {
  Avatar,
  avatarClasses,
  AvatarGroup,
  Box,
  Divider,
  ListItemButton,
  ListItemText,
  styled,
  Typography
} from '@mui/material'

import { useRoomListItem } from 'hooks/useRoomListItem'

import { getAvatarStyles, getUserInitials } from 'utils'

import { IRoom } from 'types/room'

interface IProps {
  room: IRoom
}

const StyledAvatarGroup = styled(AvatarGroup)(({ total = 0 }) => ({
  position: 'relative',
  width: '60px',
  height: '60px',
  flexShrink: 0,
  justifyContent: 'center',
  alignItems: 'center',
  ...(total > 1 && {
    [`.${avatarClasses.circular}`]: {
      fontSize: 12,
      fontWeight: 700,
      marginLeft: 0,
      position: 'absolute',
      ...getAvatarStyles(total)
    }
  })
}))

export const ListRoomItem = ({ room }: IProps) => {
  const {
    message,
    preparedDate,
    isCurrentRoom,
    handleClickRoom,
    preparedMembers,
    preparedMessage,
    preparedRoomName,
    showNotification
  } = useRoomListItem(room)

  return (
    <>
      <ListItemButton
        onClick={handleClickRoom}
        sx={{ bgcolor: isCurrentRoom ? 'action.selected' : '' }}
      >
        <StyledAvatarGroup
          max={4}
          total={preparedMembers.length}
          renderSurplus={total => (total >= 10 ? '+' : `+${total}`)}
        >
          {preparedMembers.map(member => (
            <Avatar key={`avatar-${member.id}`}>
              {getUserInitials(member)}
            </Avatar>
          ))}
        </StyledAvatarGroup>
        <ListItemText sx={{ ml: 2 }}>
          <Typography variant="subtitle2">{preparedRoomName}</Typography>
          <Typography>
            {message ? preparedMessage : 'No new messages'}
          </Typography>
        </ListItemText>
        <Box alignSelf="flex-start" mt={1} textAlign="center" flexBasis="54px">
          <Typography fontSize={10}>{preparedDate}</Typography>
          {showNotification && (
            <CircleIcon
              color="primary"
              sx={{ width: '12px', height: '12px' }}
            />
          )}
        </Box>
      </ListItemButton>
      <Divider />
    </>
  )
}
