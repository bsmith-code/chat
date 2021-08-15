import { useEffect, lazy, Suspense } from 'react'
import { getAccessToken } from '../helpers'
import { useSelector, useDispatch } from 'react-redux'
import { getUserStatus } from '../store/reducers/authReducer'
import { useHistory } from 'react-router-dom'

const PublicRoutes = lazy(() => import('./PublicRoutes'))
const ProtectedRoutes = lazy(() => import('./ProtectedRoutes'))

const AppRoutes = (): JSX.Element => {
  const isAuthenticated = !!getAccessToken()

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {isAuthenticated ? <ProtectedRoutes /> : <PublicRoutes />}
    </Suspense>
  )
}

export default AppRoutes
