import { IRoom, IMember, IMessage } from '../../types'

export interface IRoomsState {
  currentRoom: {
    data: IRoom
    isLoading: boolean
  }
  memberStatus: {
    data: IMember
    isLoading: boolean
  }
  userRooms: {
    data: IRoom[]
    isLoading: boolean
  }
  roomMembers: {
    data: IMember[]
    isLoading: boolean
  }
  roomMessages: {
    data: IMessage[]
    isLoading: boolean
  }
}

export const initialState: IRoomsState = {
  currentRoom: {
    data: {},
    isLoading: false
  },
  userRooms: {
    data: [],
    isLoading: false
  },
  memberStatus: {
    data: {},
    isLoading: false
  },
  roomMembers: {
    data: [],
    isLoading: false
  },
  roomMessages: {
    data: [],
    isLoading: false
  }
}
