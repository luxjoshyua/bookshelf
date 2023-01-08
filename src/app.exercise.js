import * as React from 'react'
import {useAuth} from './context/auth-context'
import {FullPageSpinner} from './components/lib'

// swapped from static to dyanmic component imports
// prefetch the authenticated app module using webpack magic comments
// because when the user lands on the login screen, it's likely we'll want to
// load the regular app, so it's good to reduce the time it takes to render
// the authenticated app
// ref: https://webpack.js.org/api/module-methods/#magic-comments
const AuthenticatedApp = React.lazy(() =>
  import(/* webpackPrefetch: true */ './authenticated-app'),
)
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
