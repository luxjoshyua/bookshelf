<<<<<<< HEAD
<<<<<<< HEAD
// export * from './unauthenticated-app.final'

<<<<<<<< HEAD:src/index.extra-3.js
import 'bootstrap/dist/css/bootstrap-reboot.css'
import '@reach/dialog/styles.css'
import * as React from 'react'
import {createRoot} from 'react-dom/client'
import {Button, Input, FormGroup, Spinner} from './components/lib'
import {Modal, ModalContents, ModalOpenButton} from './components/modal'
import {Logo} from './components/logo'
import {useAsync} from './utils/hooks'

function LoginForm({onSubmit, submitButton}) {
  function handleSubmit(event) {
    event.preventDefault()
    const {username, password} = event.target.elements

    onSubmit({
      username: username.value,
      password: password.value,
    })
  }

  return (
    <form
      css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        '> div': {
          margin: '10px auto',
          width: '100%',
          maxWidth: '300px',
        },
      }}
      onSubmit={handleSubmit}
    >
      <FormGroup>
        <label htmlFor="username">Username</label>
        <Input id="username" />
      </FormGroup>
      <FormGroup>
        <label htmlFor="password">Password</label>
        <Input id="password" type="password" />
      </FormGroup>
      <div>
        {React.cloneElement(submitButton, {type: 'submit'})}
        <Spinner css={{marginLeft: 5}} />
      </div>
    </form>
  )
}

function UnauthenticatedApp({login, register}) {
  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100vh',
      }}
    >
      <Logo width="80" height="80" />
      <h1>Bookshelf</h1>
      <div
        css={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          gridGap: '0.75rem',
        }}
      >
        <Modal>
          <ModalOpenButton>
            <Button variant="primary">Login</Button>
          </ModalOpenButton>
          <ModalContents aria-label="Login form" title="Login">
            <LoginForm
              onSubmit={login}
              submitButton={<Button variant="primary">Login</Button>}
            />
          </ModalContents>
        </Modal>
        <Modal>
          <ModalOpenButton>
            <Button variant="secondary">Register</Button>
          </ModalOpenButton>
          <ModalContents aria-label="Registration form" title="Register">
            <LoginForm
              onSubmit={register}
              submitButton={<Button variant="secondary">Register</Button>}
            />
          </ModalContents>
        </Modal>
      </div>
    </div>
  )
}

export {UnauthenticatedApp}
========
export * from './unauthenticated-app.exercise'

// 💯 create a `useAuth` hook
// export * from './unauthenticated-app.extra-1'
>>>>>>>> 546257ba3f76fa91b42bf52212d713ab8259f8b3:src/unauthenticated-app.js
=======
=======
>>>>>>> 9ffd57b3d63611a41c2bcecdb7ebfc6f95fad048
import {loadDevTools} from './dev-tools/load'
import './bootstrap'
import * as React from 'react'
import {createRoot} from 'react-dom/client'
<<<<<<< HEAD
=======
import {Profiler} from 'components/profiler'
>>>>>>> 9ffd57b3d63611a41c2bcecdb7ebfc6f95fad048
import {App} from './app'
import {AppProviders} from './context'

// ignore the rootRef in this file. I'm just doing it here to make
// the tests I write to check your work easier.
export const rootRef = {}
loadDevTools(() => {
  const root = createRoot(document.getElementById('root'))
  root.render(
<<<<<<< HEAD
    <AppProviders>
      <App />
    </AppProviders>,
  )
  rootRef.current = root
})
>>>>>>> 546257ba3f76fa91b42bf52212d713ab8259f8b3
=======
    <Profiler id="App Root" phases={['mount']}>
      <AppProviders>
        <App />
      </AppProviders>
    </Profiler>,
  )
  rootRef.current = root
})
>>>>>>> 9ffd57b3d63611a41c2bcecdb7ebfc6f95fad048
