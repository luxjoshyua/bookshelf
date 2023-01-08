<<<<<<< HEAD
import * as React from 'react'

const AuthContext = React.createContext()
=======
/** @jsx jsx */
import {jsx} from '@emotion/core'

import * as React from 'react'
import {queryCache} from 'react-query'
import * as auth from 'auth-provider'
import {client} from 'utils/api-client'
import {useAsync} from 'utils/hooks'
import {setQueryDataForBook} from 'utils/books'
import {FullPageSpinner, FullPageErrorFallback} from 'components/lib'

async function bootstrapAppData() {
  let user = null

  const token = await auth.getToken()
  if (token) {
    const data = await client('bootstrap', {token})
    queryCache.setQueryData('list-items', data.listItems, {
      staleTime: 5000,
    })
    // Let's also set the books in the query cache as well
    for (const listItem of data.listItems) {
      setQueryDataForBook(listItem.book)
    }
    user = data.user
  }
  return user
}

const appDataPromise = bootstrapAppData()

const AuthContext = React.createContext()
AuthContext.displayName = 'AuthContext'

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
    status,
  } = useAsync()

  React.useEffect(() => {
    run(appDataPromise)
  }, [run])

  const login = React.useCallback(
    form => auth.login(form).then(user => setData(user)),
    [setData],
  )
  const register = React.useCallback(
    form => auth.register(form).then(user => setData(user)),
    [setData],
  )
  const logout = React.useCallback(() => {
    auth.logout()
    setData(null)
  }, [setData])

  const value = React.useMemo(() => ({user, login, logout, register}), [
    login,
    logout,
    register,
    user,
  ])

  if (isLoading || isIdle) {
    return <FullPageSpinner />
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />
  }

  if (isSuccess) {
    return <AuthContext.Provider value={value} {...props} />
  }

  throw new Error(`Unhandled status: ${status}`)
}
>>>>>>> 99c0a057f628883ddab148a09133fa560e4ad4a9

function useAuth() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
<<<<<<< HEAD
    throw new Error(`useAuth must be used within a AuthContext provider`)
=======
    throw new Error(`useAuth must be used within a AuthProvider`)
>>>>>>> 99c0a057f628883ddab148a09133fa560e4ad4a9
  }
  return context
}

<<<<<<< HEAD
export {AuthContext, useAuth}
=======
function useClient() {
  const {
    user: {token},
  } = useAuth()
  return React.useCallback(
    (endpoint, config) => client(endpoint, {...config, token}),
    [token],
  )
}

export {AuthProvider, useAuth, useClient}
>>>>>>> 99c0a057f628883ddab148a09133fa560e4ad4a9
