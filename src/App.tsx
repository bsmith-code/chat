import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Styles from './styles'
import AppRoutes from './routes'
import { getAccessToken } from './helpers'
import LoaderPage from './components/LoaderPage'
import { getUserStatus } from './store/reducers/authReducer'

const App = (): JSX.Element => {
  const dispatch = useDispatch()
  const accessToken = getAccessToken()

  useEffect(() => {
    const onCreate = async () => {
      if (accessToken) {
        await dispatch(getUserStatus())
      }
    }
    onCreate()
  }, [])

  return (
    <>
      <Styles />
      <AppRoutes />
    </>
  )
}

export default App
