import * as React from 'react'
import {useAuth} from './context/auth-context'
import {FullPageSpinner} from './components/lib'

// swapped from static to dyanmic component imports
const AuthenticatedApp = React.lazy(() => import('./authenticated-app'))
const UnauthenticatedApp = React.lazy(() => import('./unauthenticated-app'))

function App() {
  const {user} = useAuth()

  return (
    // ref: https://github.com/facebook/react/issues/13947 - always return a <Component /> for fallback, never a function
    <React.Suspense fallback={<FullPageSpinner />}>
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  )
}

export {App}
