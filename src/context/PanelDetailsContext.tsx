import {
  BaseSyntheticEvent,
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import {
  useController,
  UseControllerReturn,
  useForm,
  UseFormReturn
} from 'react-hook-form'
import { shallowEqual } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'

import { selectCurrentRoomId } from 'store/client'
import {
  selectUser,
  useGetRoomsQuery,
  useUpdateRoomMutation
} from 'store/server'

import { useAppSelector } from 'hooks/useRedux'

import { roomSchema } from 'utils'

import { IRoom, IRoomForm, IUser } from 'types/room'

export interface IPanelDetailsContext {
  form: UseFormReturn<IRoomForm>
  currentUser: IUser
  currentRoom?: IRoom
  focusedField: string
  handleSubmit: (e: BaseSyntheticEvent) => Promise<void>
  handleResetForm: () => void
  setFocusedField: Dispatch<SetStateAction<string>>
  membersField: UseControllerReturn<IRoomForm, 'members'>
}

export const PanelDetailsContext = createContext({} as IPanelDetailsContext)

interface IProps {
  children: ReactNode
}
export const PanelDetailsContextProvider = ({ children }: IProps) => {
  const currentUser = useAppSelector(selectUser, shallowEqual)
  const currentRoomId = useAppSelector(selectCurrentRoomId)

  const [updateRoom] = useUpdateRoomMutation()
  const { currentRoom } = useGetRoomsQuery(currentUser.id, {
    skip: !currentRoomId || !currentUser.id,
    selectFromResult: ({ data = [], ...restResult }) => ({
      currentRoom: data.find(({ id }) => id === currentRoomId),
      ...restResult
    })
  })

  const [focusedField, setFocusedField] = useState('')

  const form = useForm<IRoomForm>({
    mode: 'onChange',
    defaultValues: currentRoom,
    resolver: yupResolver(roomSchema)
  })
  const membersField = useController({ control: form.control, name: 'members' })

  const handleResetForm = () => form.reset(currentRoom)
  const handleSubmit = form.handleSubmit(async (data: IRoomForm) => {
    await updateRoom(data)
    setFocusedField('')
  })

  useEffect(() => {
    if (currentRoom && currentRoomId) {
      handleResetForm()
    }
  }, [currentRoom, currentRoomId])

  const context = useMemo(
    () => ({
      form,
      currentUser,
      currentRoom,
      focusedField,
      membersField,
      handleSubmit,
      setFocusedField,
      handleResetForm
    }),
    [
      form,
      currentUser,
      currentRoom,
      focusedField,
      membersField,
      handleSubmit,
      setFocusedField,
      handleResetForm
    ]
  )

  return (
    <PanelDetailsContext.Provider value={context}>
      {children}
    </PanelDetailsContext.Provider>
  )
}

export const usePanelDetailsContext = () => useContext(PanelDetailsContext)
