import * as React from 'react'
import {useAsync} from '../utils/hooks'
import * as auth from 'auth-provider'
import {client} from '../utils/api-client'
import {FullPageSpinner, FullPageErrorFallback} from '../components/lib'

const AuthContext = React.createContext()
// improve from the generic <Context.Provider>, easier for debugging
AuthContext.displayName = 'AuthContext'

// custom hook to consume context,
// instead of having to do const {user} = React.useContext(AuthContext) everywhere
const useAuth = () => {
  const context = React.useContext(AuthContext)

  if (!context || context === undefined) {
    throw new Error(`useAuth must be used within an AuthProvider`)
  }
  // return the context value
  return context
}

async function getUser() {
  let user = null

  const token = await auth.getToken()
  if (token) {
    const data = await client('me', {token})
    user = data.user
  }

  return user
}

// hook that gives us an authenticated client
function useClient(endpoint, config) {
  // endpoint e.g. `books?query=${encodeURIComponent(query)}`
  // config e.g. {token: user.token}
  const {
    user: {token},
  } = useAuth()
  // returns a memoized authenticated client
  // so we don't have to compute the user each time on render. only if user changes
  return React.useCallback(
    (endpoint, config) => client(endpoint, {...config, token}),
    [token],
  )
}

// component that renders our AuthContext
function AuthProvider(props) {
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
    const value = {user, login, register, logout}

    return <AuthContext.Provider value={value} {...props} />
  }
}

export {useAuth, useClient, AuthProvider}
