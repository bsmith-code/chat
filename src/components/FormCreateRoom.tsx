import { useState, FormEvent } from 'react'
import { useAppDispatch } from '../store'
import { createRoom, getUserRooms } from '../features/rooms'

interface IProps {
  toggleCreateRoom: () => void
}
interface IFormFields {
  [key: string]: {
    type: string
    value: string
    placeholder: string
  }
}

const FormCreateRoom = ({ toggleCreateRoom }: IProps): JSX.Element => {
  // Composition
  const dispatch = useAppDispatch()

  // Form Fields
  const [fields, setFields] = useState<IFormFields>({
    name: {
      value: '',
      type: 'text',
      placeholder: 'Room Name'
    },
    users: {
      value: '',
      type: 'textarea',
      placeholder: 'Enter emails or usernames separated by commas'
    }
  })

  const handleInput = (event: FormEvent, field: string) => {
    const { value } = event.target as HTMLInputElement

    setFields({
      ...fields,
      [field]: {
        ...fields[field],
        value
      }
    })
  }
  const [isSubmitting, setIsSubmitting] = useState(false)
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    // Get Form Values
    const {
      name: { value: name },
      users: { value: users }
    } = fields

    // Prepare JSON Data
    const jsonData = {
      name,
      users: users.split(', ')
    }

    setIsSubmitting(true)
    await dispatch(createRoom(jsonData))
    await dispatch(getUserRooms())
    setIsSubmitting(false)

    toggleCreateRoom()
  }

  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(fields).map((field: string) => {
        const { type, value, placeholder } = fields[field]
        return (
          <fieldset key={`input-${field}`}>
            <input
              required
              type={type}
              name={field}
              value={value}
              placeholder={placeholder}
              onInput={event => handleInput(event, field)}
            />
          </fieldset>
        )
      })}
      <button type="submit">Create</button>
      {isSubmitting ? <div>Submitting...</div> : null}
    </form>
  )
}

export default FormCreateRoom
