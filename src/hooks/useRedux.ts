import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { IRootState, TAppDispatch } from 'types/redux'

export const useAppDispatch = () => useDispatch<TAppDispatch>()
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector
