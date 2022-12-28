import * as React from 'react'
const AuthContext = React.createContext()

// custom hook to consume context,
// instead of having to do const {user} = React.useContext(AuthContext) everywhere
const useAuth = () => {
  const context = React.useContext(AuthContext)

  if (!context || context === undefined) {
    throw new Error('useAuth must be used within a AuthContext provider')
  }
  // return the context value
  return context
}

export {AuthContext, useAuth}
