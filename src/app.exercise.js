/** @jsx jsx */
import {jsx} from '@emotion/core'

import * as React from 'react'
import * as auth from 'auth-provider'
import {AuthenticatedApp} from './authenticated-app'
import {UnauthenticatedApp} from './unauthenticated-app'

function App() {
  // set state for the user
  const [user, setUser] = React.useState(null)

  // create a login function that calls auth.login then sets the user
  const login = form => auth.login(form).then(u => setUser(u))

  // do the same for register
  const register = form => auth.register(form).then(u => setUser(u))

  // create a logout function that calls auth.logout() and sets the user to null
  const logout = () => auth.logout().then(setUser(null))

  // if there's a user, then render the AuthenticatedApp with the user and logout,
  // if not, render UnauthenticatedApp with the login and register
  return (
    <div>
      {user ? (
        <AuthenticatedApp user={user} logout={logout} />
      ) : (
        <UnauthenticatedApp login={login} register={register} />
      )}
    </div>
  )
}

export {App}

/*
eslint
  no-unused-vars: "off",
*/
