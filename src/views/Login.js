import React from 'react'
import styled from 'styled-components'
import LoginForm from '../components/forms/LoginForm'

const Login = () => {
  return (
    <LoginMain>
      <LoginSection>
        <LoginTitle>Well Chat.</LoginTitle>
        <LoginForm />
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

export default Login
