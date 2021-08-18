import {
  getRoomById,
  getUserRooms,
  getRoomMembers,
  getRoomMessages,
  getRoomMemberStatus
} from './roomsThunks'
import { PayloadAction, ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { IRoom, IMember, IMessage } from '../../types'
import { IRoomsState } from './roomsState'

export const reducers = {
  setCurrentRoomId: (
    state: IRoomsState,
    action: PayloadAction<string>
  ): void => {
    state.currentRoomId = action.payload
  }
}

export const extraReducers = (
  builder: ActionReducerMapBuilder<IRoomsState>
): void => {
  // Get Room by ID
  builder
    .addCase(getRoomById.pending, state => {
      state.currentRoom = {
        data: {},
        isLoading: true
      }
    })
    .addCase(getRoomById.fulfilled, (state, action: PayloadAction<IRoom>) => {
      state.currentRoom = {
        isLoading: false,
        data: action.payload
      }
    })
    .addCase(getRoomById.rejected, state => {
      state.currentRoom = {
        data: {},
        isLoading: false
      }
    })

  // Get User Rooms
  builder
    .addCase(getUserRooms.pending, state => {
      state.userRooms = {
        data: [],
        isLoading: true
      }
    })
    .addCase(
      getUserRooms.fulfilled,
      (state, action: PayloadAction<IRoom[]>) => {
        state.userRooms = {
          isLoading: false,
          data: action.payload
        }
      }
    )
    .addCase(getUserRooms.rejected, state => {
      state.userRooms = {
        data: [],
        isLoading: false
      }
    })

  // Get Room Member Status
  builder
    .addCase(getRoomMemberStatus.pending, state => {
      state.memberStatus = {
        data: {},
        isLoading: true
      }
    })
    .addCase(
      getRoomMemberStatus.fulfilled,
      (state, action: PayloadAction<IMember>) => {
        state.memberStatus = {
          isLoading: false,
          data: action.payload
        }
      }
    )
    .addCase(getRoomMemberStatus.rejected, state => {
      state.memberStatus = {
        data: {},
        isLoading: false
      }
    })

  // Get Room Members
  builder
    .addCase(getRoomMembers.pending, state => {
      state.roomMembers = {
        data: [],
        isLoading: true
      }
    })
    .addCase(
      getRoomMembers.fulfilled,
      (state, action: PayloadAction<IMember[]>) => {
        state.roomMembers = {
          isLoading: false,
          data: action.payload
        }
      }
    )
    .addCase(getRoomMembers.rejected, state => {
      state.roomMembers = {
        data: [],
        isLoading: false
      }
    })

  // Get Room Messages
  builder
    .addCase(getRoomMessages.pending, state => {
      state.roomMessages = {
        data: [],
        isLoading: true
      }
    })
    .addCase(
      getRoomMessages.fulfilled,
      (state, action: PayloadAction<IMessage[]>) => {
        state.roomMessages = {
          isLoading: false,
          data: action.payload
        }
      }
    )
    .addCase(getRoomMessages.rejected, state => {
      state.roomMessages = {
        data: [],
        isLoading: false
      }
    })
}
