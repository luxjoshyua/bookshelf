import {loadDevTools} from './dev-tools/load'
import './bootstrap'
import * as React from 'react'
import {createRoot} from 'react-dom/client'
import {ReactQueryConfigProvider} from 'react-query'
<<<<<<< HEAD
=======
import {AuthProvider} from './context/auth-context'
>>>>>>> 546257ba3f76fa91b42bf52212d713ab8259f8b3
import {App} from './app'

const queryConfig = {
  queries: {
    useErrorBoundary: true,
    refetchOnWindowFocus: false,
    retry(failureCount, error) {
      if (error.status === 404) return false
      else if (failureCount < 2) return true
      else return false
    },
  },
}

// ignore the rootRef in this file. I'm just doing it here to make
// the tests I write to check your work easier.
export const rootRef = {}
loadDevTools(() => {
  const root = createRoot(document.getElementById('root'))
  root.render(
    <ReactQueryConfigProvider config={queryConfig}>
<<<<<<< HEAD
      <App />
=======
      <AuthProvider>
        <App />
      </AuthProvider>
>>>>>>> 546257ba3f76fa91b42bf52212d713ab8259f8b3
    </ReactQueryConfigProvider>,
  )
  rootRef.current = root
})
