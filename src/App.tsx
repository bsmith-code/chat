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
  const { data: authenticatedUser, isLoading } = useSelector(
    (state: any) => state.auth.authenticatedUser
  )

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
      {isLoading ? <LoaderPage /> : <AppRoutes />}
    </>
  )
}

export default App
