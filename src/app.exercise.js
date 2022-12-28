/** @jsx jsx */
import {jsx} from '@emotion/core'
import {useAuth} from './context/auth-context'
import {AuthenticatedApp} from './authenticated-app'
import {UnauthenticatedApp} from './unauthenticated-app'

function App() {
  const {user} = useAuth()

  return user ? <AuthenticatedApp /> : <UnauthenticatedApp />
}

export {App}
