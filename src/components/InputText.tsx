import { FormEvent } from 'react'

interface IProps {
  name: string
  field: {
    type: string
    value: string
    label: string
  }
  handleInputChange: (event: FormEvent, name: string) => void
}

const InputText = ({ name, field, handleInputChange }: IProps): JSX.Element => {
  return (
    <fieldset>
      <input
        required
        name={name}
        type={field.type}
        value={field.value}
        onInput={event => handleInputChange(event, name)}
      />
    </fieldset>
  )
}

export default InputText
