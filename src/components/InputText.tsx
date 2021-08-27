import InputLabel from './InputLabel'
import { IInputProps } from '../types'

const InputText = ({ name, field, handleInput }: IInputProps): JSX.Element => {
  return (
    <fieldset>
      <InputLabel label={field.label} />
      <input
        required
        name={name}
        type={field.type}
        value={field.value}
        onInput={event => handleInput(event, name)}
      />
    </fieldset>
  )
}

export default InputText
