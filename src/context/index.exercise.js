import * as React from 'react'
import {ReactQueryConfigProvider} from 'react-query'
import {BrowserRouter as Router} from 'react-router-dom'
import {AuthProvider} from './auth-context.exercise'

const queryConfig = {
  retry(failureCount, error) {
    if (error.status === 404) return false
    else if (failureCount < 2) return true
    else return false
  },
  useErrorBoundary: true,
  refetchAllOnWindowFocus: false,
}

// renders all the global context providers for our app
function AppProviders(props) {
  return (
    <ReactQueryConfigProvider config={queryConfig}>
      <Router>
        <AuthProvider>{props.children}</AuthProvider>
      </Router>
    </ReactQueryConfigProvider>
  )
}

export {AppProviders}
