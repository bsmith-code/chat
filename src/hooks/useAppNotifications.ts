import { useEffect } from 'react'
import { shallowEqual } from 'react-redux'
import { useSnackbar } from 'notistack'

import { removeNotification, selectNotifications } from 'store/client'

import { useAppDispatch, useAppSelector } from 'hooks/useRedux'

export const useAppNotifications = () => {
  const dispatch = useAppDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const notifications = useAppSelector(selectNotifications, shallowEqual)

  useEffect(() => {
    Object.entries(notifications).forEach(([key, message]) => {
      if (message) {
        enqueueSnackbar(message, {
          key,
          variant: 'error',
          preventDuplicate: true,
          autoHideDuration: 3000,
          onExited: () => {
            dispatch(removeNotification(key))
          }
        })
      }
    })
  }, [notifications])
}
