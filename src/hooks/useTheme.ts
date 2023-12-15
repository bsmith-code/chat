import { setStoredTheme } from 'themes'

import { selectTheme, updateTheme } from 'store/client'

import { useAppDispatch, useAppSelector } from 'hooks/useRedux'

import { TTheme } from 'types/app'

export const useTheme = () => {
  const dispatch = useAppDispatch()
  const currentTheme = useAppSelector(selectTheme)

  const handleUpdateTheme = (theme: TTheme) => {
    setStoredTheme(theme)
    dispatch(updateTheme(theme))
  }

  return {
    currentTheme,
    handleUpdateTheme
  }
}
