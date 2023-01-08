import * as React from 'react'
import {useAuth} from './context/auth-context'
import {AuthenticatedApp} from './authenticated-app'
import {UnauthenticatedApp} from './unauthenticated-app'

export function App() {
  const {user} = useAuth()
  return user ? <AuthenticatedApp /> : <UnauthenticatedApp />
}

// 💯 colocate global providers
// export * from './app.extra-3'
