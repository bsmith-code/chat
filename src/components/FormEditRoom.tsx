import { useState, useEffect, useMemo, FormEvent, Suspense } from 'react'
import { useAppDispatch } from '../store'
import { createRoom, getUserRooms } from '../features/rooms'
import { IMember, IRoom } from '../types'
import { useFormOptions } from '../hooks'

interface IProps {
  roomDetails: {
    id?: string
    name?: string
    accepted: IMember[]
    pending: IMember[]
  }
  toggleEditRoom: () => void
}

const FormEditRoom = ({ toggleEditRoom, roomDetails }: IProps): JSX.Element => {
  // Composition
  const dispatch = useAppDispatch()
  const {
    fields,
    setFields,
    componentMap,
    isSubmitting,
    setIsSubmitting,
    handleInputChange
  } = useFormOptions()

  // Form Fields
  useEffect(() => {
    setFields({
      name: {
        label: 'Room Name:',
        value: roomDetails.name ?? '',
        type: 'text'
      },
      members: {
        label: 'Room Members:',
        value: roomDetails.accepted ?? [],
        type: 'typeAheadMulti'
      },
      pending: {
        label: 'Pending Invites:',
        value: roomDetails.pending ?? [],
        type: 'typeAheadMulti'
      }
    })
  }, [])

  // Handle Submit
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    // Get Form Values
    const {
      name: { value: name },
      members: { value: members },
      pending: { value: pending }
    } = fields

    // Prepare JSON Data
    const jsonData = {
      name,
      members,
      pending
    }

    setIsSubmitting(true)
    // await dispatch(createRoom(jsonData))
    // await dispatch(getUserRooms())
    setIsSubmitting(false)

    toggleEditRoom()
  }

  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(fields).map((name: string) => {
        const { type, value, label } = fields[name]
        const Component = componentMap[type]

        return (
          <Suspense fallback={false} key={`input-${name}`}>
            <Component
              name={name}
              field={{ type, value, label }}
              handleInputChange={handleInputChange}
            />
          </Suspense>
        )
      })}
      <button type="submit">Create</button>
      {isSubmitting ? <div>Submitting...</div> : null}
    </form>
  )
}

export default FormEditRoom
