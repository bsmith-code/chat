import { useEffect } from 'react'

import { useErrorMutation } from 'store/server'

import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { Box, Button, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

const StyledContainer = styled(Box)`
  width: 600px;
  text-align: center;
`

const StyledWrapper = styled(Box)`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`

interface IProps {
  error: Error
  resetErrorBoundary: () => void
}
export const AppErrorBoundary = ({ error, resetErrorBoundary }: IProps) => {
  const [emailError] = useErrorMutation()
  const { name, message, stack } = error ?? {}

  useEffect(() => {
    if (error && process.env.NODE_ENV === 'production') {
      emailError({
        name,
        stack,
        message,
        host: window.location.hostname
      }).catch(e => e as Error)
    }
  }, [error])

  return (
    <StyledWrapper>
      <StyledContainer>
        <ErrorOutlineIcon sx={{ fontSize: 50, marginBottom: 2.5 }} />
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          align="center"
          color="text.primary"
        >
          Something went wrong
        </Typography>
        {message && (
          <Typography
            component="p"
            align="center"
            marginBottom={5}
            letterSpacing="1px"
          >
            {message}
          </Typography>
        )}
        <Button
          color="primary"
          onClick={resetErrorBoundary}
          sx={{ letterSpacing: '1px' }}
        >
          Try again
        </Button>
      </StyledContainer>
    </StyledWrapper>
  )
}
