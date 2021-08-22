import styled from 'styled-components'
import { getYear } from 'date-fns'

const AppFooter = (): JSX.Element => {
  return (
    <Wrapper>
      <AppTrademark>
        &copy; Well Chat, {getYear(new Date())}. All Rights Reserved.
      </AppTrademark>
    </Wrapper>
  )
}

const Wrapper = styled.footer`
  background: var(--blue);
  width: 100%;
  height: 40px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`
const AppTrademark = styled.p`
  margin: 0;
  padding: 0;
  color: var(--white);
  font-size: 12px;
`

export default AppFooter
