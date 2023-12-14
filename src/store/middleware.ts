import {
  AnyAction,
  createListenerMiddleware,
  isAnyOf,
  isRejected,
  PayloadAction
} from '@reduxjs/toolkit'

import { createNotification } from 'store/client'
import { authApi, authListeners } from 'store/server'

import { TAppListenerAPI, TAppStartListening } from 'types/redux'

const ignoredActions = isAnyOf(authApi.endpoints.session.matchRejected)

export const exceptionListener = {
  matcher: (action: AnyAction) =>
    ignoredActions(action) ? false : isRejected(action),
  effect: (action: AnyAction, { dispatch }: TAppListenerAPI) => {
    const { payload } = action as PayloadAction<{ data: { message: string } }>
    const message = payload?.data?.message

    if (message) {
      dispatch(createNotification(message))
    }
  }
}

export const listenerMiddleware = createListenerMiddleware()

const startAppListening =
  listenerMiddleware.startListening as TAppStartListening

const listeners = [exceptionListener, ...authListeners]

listeners.forEach(listener => {
  startAppListening(listener as never)
})
