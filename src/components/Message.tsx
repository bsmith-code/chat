import { IMessage } from '../types'
import styled from 'styled-components'

interface IProps {
  messageObj: IMessage
}

const Message = ({ messageObj }: IProps): JSX.Element => {
  const {
    message,
    createdAt,
    author: { firstName, lastName }
  } = {
    message: '',
    createdAt: '',
    author: {
      firstName: '',
      lastName: ''
    },
    ...messageObj
  }

  return (
    <Wrapper>
      <Header>
        <Author>
          {firstName} {lastName}
        </Author>
        <Created>{createdAt}</Created>
      </Header>
      <Main>
        <MessageText>{message}</MessageText>
      </Main>
    </Wrapper>
  )
}

const Wrapper = styled.article``
const Header = styled.header`
  display: flex;
  align-items: center;
`
const Author = styled.p``
const Created = styled.p``
const Main = styled.main``
const MessageText = styled.p``

export default Message
