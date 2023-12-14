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
import { yupResolver } from '@hookform/resolvers/yup'

import { updateCurrentRoomId } from 'store/client'
import { useUpdateRoomMutation } from 'store/server'

import { useCurrentRoom } from 'hooks/useCurrentRoom'
import { useAppDispatch } from 'hooks/useRedux'

import { roomSchema } from 'utils'

import { IRoom, IRoomForm } from 'types/room'

export interface IPanelDetailsContext {
  form: UseFormReturn<IRoomForm>
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
  const dispatch = useAppDispatch()

  const { currentRoom, currentRoomId } = useCurrentRoom()

  const [updateRoom, { isError }] = useUpdateRoomMutation()

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
    if (!currentRoom) {
      dispatch(updateCurrentRoomId(''))
    }

    if ((currentRoom && currentRoomId) || isError) {
      handleResetForm()
    }
  }, [currentRoom, currentRoomId, isError])

  const context = useMemo(
    () => ({
      form,
      currentRoom,
      focusedField,
      membersField,
      handleSubmit,
      setFocusedField,
      handleResetForm
    }),
    [
      form,
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
