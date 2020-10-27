import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import actions from '../../store/actions'

const LoginForm = () => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [fields, updateFields] = useState([
    {
      name: 'username',
      placeholder: 'Username',
      type: 'text',
      value: '',
      required: true,
      errors: [],
    },
    {
      name: 'password',
      placeholder: 'Password',
      type: 'password',
      value: '',
      required: true,
      errors: [],
    },
  ])

  const handleSubmit = async () => {
    setIsLoading(true)
    const formData = {}
    fields.map(field => {
      formData[field.name] = field.value
    })
    await dispatch(actions.auth.login(formData))
    setIsLoading(false)
  }

  const handleInputChange = idx => e => {
    const newArr = [...fields]
    newArr[idx] = {
      ...newArr[idx],
      value: e.target.value,
    }
    updateFields(newArr)
  }

  const validateForm = e => {
    e.preventDefault()

    fields.map(field => {
      if (!field.value) {
        field.errors.push('This field is required')
      } else {
        field.errors = []
      }
    })

    if (fields.every(field => !field.errors.length)) {
      handleSubmit()
    }
  }
  return (
    <form onSubmit={e => validateForm(e)}>
      {fields.map((field, idx) => (
        <fieldset key={`input-${idx}`}>
          <input
            type={field.type}
            name={field.name}
            placeholder={field.placeholder}
            onChange={handleInputChange(idx)}
          />
          {field.errors.length && <div>{field.errors.join(', ')}</div>}
        </fieldset>
      ))}
      <button type="submit">Login</button>
    </form>
  )
}

export default LoginForm
