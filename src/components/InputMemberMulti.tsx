import { IInputProps, IMember } from '../types'
import styled from 'styled-components'
import InputLabel from './InputLabel'

interface IProps extends Omit<IInputProps, 'field'> {
  field: {
    label: string
    value: IMember[]
  }
}

const InputMemberMulti = ({
  name,
  field,
  handleInput
}: IProps): JSX.Element => {
  return (
    <fieldset>
      <InputLabel label={field.label} />
      <InputWrapper>
        {field.value.length ? (
          <>
            {field.value.map(member => {
              // Deconstruct and Set Default Values
              const {
                id,
                profile: { email }
              } = {
                id: '',
                profile: {
                  email: ''
                },
                ...member
              }
              return <MemberPill key={`member-${id}`}>{email}</MemberPill>
            })}
          </>
        ) : null}
      </InputWrapper>
    </fieldset>
  )
}

const InputWrapper = styled.div`
  background: var(--light-gray);
  border-radius: 28px;
`
const MemberPill = styled.span`
  background: var(--charcoal);
  color: var(--white);
  border-radius: 22px;
  display: flex;
  align-items: center;
  padding: 6px 16px 6px 8px;
  margin: 5px;
`

export default InputMemberMulti
