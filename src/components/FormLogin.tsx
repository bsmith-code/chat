import React, { useState, useEffect, FormEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from 'react-loaders'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { login } from '../store/reducers/authReducer'

const LoginForm = () => {
  // Composition
  const history = useHistory()
  const dispatch = useDispatch()
  const { data: authenticatedUser } = useSelector(
    (state: any) => state.auth.authenticatedUser
  )

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

  useEffect(() => {
    if (authenticatedUser) {
      history.push('/')
    }
  }, [authenticatedUser])

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
  const handleSubmit = async () => {
    setIsSubmitting(true)

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

    await dispatch(login(jsonData))
    setIsSubmitting(false)
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

const ErrorMsg = styled.p`
  margin: 0;
  font-size: 12px;
  text-align: left;
  color: var(--red);
`

export default LoginForm
