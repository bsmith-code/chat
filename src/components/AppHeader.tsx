import styled from 'styled-components'
const AppHeader = (): JSX.Element => {
  return (
    <Wrapper>
      <AppTitle>Well Chat.</AppTitle>
    </Wrapper>
  )
}

const Wrapper = styled.header`
  background: var(--blue);
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`
const AppTitle = styled.p`
  margin: 0;
  padding: 0;
  color: var(--white);
  font-size: 20px;
`

export default AppHeader
