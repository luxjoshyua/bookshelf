/** @jsx jsx */
import {jsx} from '@emotion/core'

import * as React from 'react'
import * as auth from 'auth-provider'
import {BrowserRouter as Router} from 'react-router-dom'
import {FullPageSpinner, FullPageErrorFallback} from './components/lib'
import {client} from './utils/api-client'
import {useAsync} from './utils/hooks'
import {AuthContext} from './context/auth-context'
import {AuthenticatedApp} from './authenticated-app'
import {UnauthenticatedApp} from './unauthenticated-app'

async function getUser() {
  let user = null

  const token = await auth.getToken()
  if (token) {
    const data = await client('me', {token})
    user = data.user
  }

  return user
}

function App() {
  const {
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    isSuccess,
    run,
    setData,
  } = useAsync()

  React.useEffect(() => {
    run(getUser())
  }, [run])

  const login = form => auth.login(form).then(user => setData(user))
  const register = form => auth.register(form).then(user => setData(user))
  const logout = () => {
    auth.logout()
    setData(null)
  }

  if (isLoading || isIdle) {
    return <FullPageSpinner />
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />
  }

  if (isSuccess) {
    const props = {user, login, register, logout}

    return (
      <AuthContext.Provider value={props}>
        {user ? (
          <Router>
            <AuthenticatedApp />
          </Router>
        ) : (
          <UnauthenticatedApp />
        )}
      </AuthContext.Provider>
    )
  }
}

export {App}
