import { Route } from 'react-router-dom'
import AppHeader from './AppHeader'
import AppFooter from './AppFooter'
import AppNotifications from './AppNotifications'

interface IProps {
  component: any
  path?: string
  exact?: boolean
}

const LayoutProtected = ({
  component: Component,
  ...rest
}: IProps): JSX.Element => (
  <Route
    {...rest}
    render={props => (
      <>
        <AppHeader />
        <Component {...props} />
        <AppFooter />
      </>
    )}
  ></Route>
)

export default LayoutProtected
