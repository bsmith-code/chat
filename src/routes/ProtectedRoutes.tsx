import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import ViewDashboard from '../components/ViewDashboard'
import styled from 'styled-components'

interface IDefaultProps {
  component: any
  path?: string
  exact?: boolean
}

const ProtectedRouteLayout = ({
  component: Component,
  ...rest
}: IDefaultProps) => (
  <Route
    {...rest}
    render={props => (
      <>
        <AppHeader />
        <AppMain>
          <Component {...props} />
        </AppMain>
        <AppFooter />
      </>
    )}
  ></Route>
)

const ProtectedRoutes = (): JSX.Element => {
  return (
    <Router>
      <Switch>
        <ProtectedRouteLayout path="/" component={ViewDashboard} />
      </Switch>
    </Router>
  )
}

const AppHeader = styled.header`
  background: var(--navy-blue);
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px 0 0;
`
const AppMain = styled.main`
  width: 100%;
`
const AppFooter = styled.footer`
  background: gray;
  width: 100%;
  height: 40px;
`

export default ProtectedRoutes
