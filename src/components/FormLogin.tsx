import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from 'react-loaders'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import actions from '../store/actions'

const LoginForm = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.auth.currentUser)
  const [isLoading, setIsLoading] = useState(false)
  const [fields, updateFields] = useState([
    {
      name: 'username',
      placeholder: 'Username',
      type: 'text',
      value: '',
      required: true,
      errors: []
    },
    {
      name: 'password',
      placeholder: 'Password',
      type: 'password',
      value: '',
      required: true,
      errors: []
    }
  ])

  useEffect(() => {
    if (currentUser) {
      history.push('/')
    }
  }, [currentUser])

  const handleInputChange = idx => e => {
    const newFields = [...fields]
    newFields[idx] = {
      ...newFields[idx],
      value: e.target.value
    }
    updateFields(newFields)
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    const formData = {}
    fields.map(field => {
      formData[field.name] = field.value
    })
    await dispatch(actions.auth.login(formData))
    setIsLoading(false)
  }

  const validateForm = e => {
    e.preventDefault()

    const newFields = [...fields]
    newFields.map(field => {
      if (!field.value) {
        field.errors = ['This field is required']
      } else {
        field.errors = []
      }
    })
    updateFields(newFields)

    if (fields.every(field => !field.errors.length)) {
      handleSubmit()
    }
  }
  return (
    <form onSubmit={e => validateForm(e)}>
      {isLoading ? (
        <Loader type="ball-grid-pulse" />
      ) : (
        fields.map((field, idx) => (
          <fieldset key={`input-${idx}`}>
            <input
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              onChange={handleInputChange(idx)}
            />
            {field.errors.length > 0 && (
              <ErrorMsg>{(field.errors, field.errors.join(', '))}</ErrorMsg>
            )}
          </fieldset>
        ))
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
