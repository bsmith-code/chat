import React from 'react'
import Loader from 'react-loaders'
import styled from 'styled-components'

const PageLoader = () => {
  return (
    <LoaderWrapper>
      <Loader type="ball-grid-pulse" active />
    </LoaderWrapper>
  )
}

const LoaderWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

export default PageLoader
