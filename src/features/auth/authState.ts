import { IAuthenticatedUser } from '../../types'

export interface IAuthState {
  authenticatedUser: {
    isLoading: boolean
    data: IAuthenticatedUser | null
  }
}

export const initialState: IAuthState = {
  authenticatedUser: {
    data: null,
    isLoading: false
  }
}
