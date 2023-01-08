/** @jsx jsx */
import {jsx} from '@emotion/core'

import * as React from 'react'
import * as auth from 'auth-provider'
import {AuthenticatedApp} from './authenticated-app'
import {UnauthenticatedApp} from './unauthenticated-app'
import {client} from 'utils/api-client.extra-4'
import {useAsync} from 'utils/hooks'
import {FullPageSpinner} from 'components/lib'
import * as colors from './styles/colors'

const getUser = async () => {
  let user = null
  const token = await auth.getToken()

  if (token) {
    // we're logged in, so let's go get the user's data
    const data = await client('me', {token})
    user = data.user
  }

  return user
}

function App() {
  // set state for the user
  // const [user, setUser] = React.useState(null)

  const {
    data: user,
    error,
    isIdle,
    isLoading,
    isSuccess,
    isError,
    run,
    setData,
  } = useAsync()

  React.useEffect(() => {
    // getUser().then(u => setUser(u))
    run(getUser())
  }, [run]) // pass dependency so only runs once on mount

  // create a login function that calls auth.login then sets the user
  // const login = form => auth.login(form).then(u => setUser(u))

  const login = form => auth.login(form).then(user => setData(user))

  // do the same for register
  const register = form => auth.register(form).then(user => setData(user))

  // create a logout function that calls auth.logout() and sets the user to null
  const logout = () => {
    auth.logout()
    setData(null)
  }

  if (isLoading || isIdle) {
    return <FullPageSpinner />
  }

  if (isError) {
    return (
      <div
        css={{
          color: colors.danger,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <p>Uh oh... There's a problem. Try refreshing the app.</p>
        <pre>{error.message}</pre>
      </div>
    )
  }

  if (isSuccess) {
    return user ? (
      // if there's a user, then render the AuthenticatedApp with the user and logout,
      <AuthenticatedApp user={user} logout={logout} />
    ) : (
      // if not, render UnauthenticatedApp with the login and register
      <UnauthenticatedApp login={login} register={register} />
    )
  }
}

export {App}

/*
eslint
  no-unused-vars: "off",
*/
