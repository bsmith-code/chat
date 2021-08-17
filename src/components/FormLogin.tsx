import Loader from 'react-loaders'
import styled from 'styled-components'
import { useAppDispatch } from '../store'
import { useState, FormEvent } from 'react'
import { useHistory } from 'react-router-dom'
import { login } from '../store/slices/authSlice'

const LoginForm = () => {
  // Composition
  const history = useHistory()
  const dispatch = useAppDispatch()

  // Form Fields
  interface IFormFields {
    [key: string]: {
      type: string
      value: string
      placeholder: string
    }
  }
  const [fields, setFields] = useState<IFormFields>({
    username: {
      value: '',
      type: 'text',
      placeholder: 'Username'
    },
    password: {
      value: '',
      type: 'password',
      placeholder: 'Password'
    }
  })

  const handleInputChange = (event: FormEvent, field: string) => {
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
      username: { value: username },
      password: { value: password }
    } = fields

    // Prepare JSON Data
    const jsonData = {
      username,
      password
    }

    setIsSubmitting(true)
    await dispatch(login(jsonData))
    setIsSubmitting(false)

    history.push('/')
  }

  return (
    <form onSubmit={handleSubmit}>
      {isSubmitting ? (
        <Loader type="ball-grid-pulse" active />
      ) : (
        Object.keys(fields).map((field: string) => {
          const { type, value, placeholder } = fields[field]

          return (
            <fieldset key={`input-${field}`}>
              <input
                required
                type={type}
                name={field}
                value={value}
                placeholder={placeholder}
                onInput={event => handleInputChange(event, field)}
              />
            </fieldset>
          )
        })
      )}
      <SubmitBtn type="submit">Login</SubmitBtn>
    </form>
  )
}

const SubmitBtn = styled.button`
  width: 100%;
  margin: 40px 0 0 0;
  padding: 8px 10px;
`

export default LoginForm
