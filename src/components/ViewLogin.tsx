import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import LoginForm from './FormLogin'

const Login = () => {
  const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(actions.auth.logout())
  // }, [])

  return (
    <LoginMain>
      <LoginSection>
        <LoginTitle>Well Chat.</LoginTitle>
        <LoginForm />
        <RegisterWrapper>
          <RegisterCopy>Don't have an account?</RegisterCopy>
          <RegisterLink to="register">Register Now</RegisterLink>
        </RegisterWrapper>
      </LoginSection>
    </LoginMain>
  )
}

const LoginMain = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`
const LoginSection = styled.section`
  width: 100%;
  max-width: 400px;
  text-align: center;
`

const LoginTitle = styled.h1`
  color: var(--blue);
  margin: 0 0 60px 0;
`
const RegisterWrapper = styled.div`
  margin: 40px 0 0 0;
  font-size: 13px;
`

const RegisterCopy = styled.p`
  margin: 0;
`
const RegisterLink = styled(Link)`
  color: var(--blue);
  font-weight: 600;
`
export default Login
