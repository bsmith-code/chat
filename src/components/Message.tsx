import { useMemo } from 'react'
import { IMessage } from '../types'
import styled from 'styled-components'
import { format } from 'date-fns'
interface IProps {
  messageObj: IMessage
}

const Message = ({ messageObj }: IProps): JSX.Element => {
  return useMemo(() => {
    // Message Factory
    const { author, message, createdAt } = (() => {
      // Deconstruct Message Obj
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

      // Transform Values
      return {
        message,
        author: `${firstName} ${lastName}`,
        createdAt: format(new Date(createdAt), 'MMM dd, h:mm a')
      }
    })()

    return (
      <Wrapper>
        <Header>
          <Author>{author}</Author>
          <Created>{createdAt}</Created>
        </Header>
        <Main>
          <MessageText>{message}</MessageText>
        </Main>
      </Wrapper>
    )
  }, [messageObj])
}

const Wrapper = styled.article`
  margin: 0 0 30px 0;
  font-size: 14px;
`
const Header = styled.header`
  display: flex;
  align-items: center;
  margin: 0 0 10px 0;
`
const Author = styled.p`
  margin: 0;
  font-weight: 600;
`
const Created = styled.p`
  font-size: 12px;
  margin: 0 0 0 10px;
  color: var(--gray);
`
const Main = styled.main``
const MessageText = styled.p`
  margin: 0;
`

export default Message
