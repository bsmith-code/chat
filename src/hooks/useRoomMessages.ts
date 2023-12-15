import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'
import { shallowEqual } from 'react-redux'

import { selectCurrentRoomId } from 'store/client'
import {
  selectUser,
  useCreateMessageMutation,
  useGetRoomMessagesQuery
} from 'store/server'

import { useAppSelector } from 'hooks/useRedux'

export const useRoomMessages = () => {
  const currentUser = useAppSelector(selectUser, shallowEqual)
  const currentRoomId = useAppSelector(selectCurrentRoomId)

  const { data: messages = [] } = useGetRoomMessagesQuery(currentRoomId, {
    skip: !currentRoomId
  })

  const messagesRef = useRef<HTMLDivElement | null>(null)
  const [userMessage, setUserMessage] = useState('')
  const [createMessage] = useCreateMessageMutation()

  const handleSubmitMessage = async (e: FormEvent) => {
    e.preventDefault()

    if (userMessage && currentRoomId) {
      await createMessage({ message: userMessage, roomId: currentRoomId })
      setUserMessage('')
    }
  }

  const handleInputMessage = (event: ChangeEvent<HTMLInputElement>) => {
    setUserMessage(event.target.value)
  }

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }
  }, [messages])

  return {
    messages,
    messagesRef,
    userMessage,
    currentUser,
    currentRoomId,
    handleInputMessage,
    handleSubmitMessage
  }
}
