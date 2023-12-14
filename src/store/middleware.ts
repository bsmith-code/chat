import {
  AnyAction,
  createListenerMiddleware,
  isRejected,
  PayloadAction
} from '@reduxjs/toolkit'

import { createNotification } from 'store/client'

import { TAppListenerAPI, TAppStartListening } from 'types/redux'

export const exceptionListener = {
  matcher: isRejected,
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

startAppListening(exceptionListener)
