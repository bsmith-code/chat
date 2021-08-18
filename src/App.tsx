import { useEffect } from 'react'
import { useAppDispatch } from './store'
import Styles from './styles'
import AppRoutes from './routes'
import { getAccessToken } from './helpers'
import { getUserStatus } from './features/auth'

const App = (): JSX.Element => {
  const dispatch = useAppDispatch()
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
