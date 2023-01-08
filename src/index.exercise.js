<<<<<<< HEAD
import * as React from 'react'
import {createRoot} from 'react-dom/client'
import {Logo} from 'components/logo'
import {Dialog} from '@reach/dialog'
import '@reach/dialog/styles.css'

function LoginForm({onSubmit, buttonText}) {
=======
/** @jsx jsx */
import {jsx} from '@emotion/core'
import * as React from 'react'
import 'bootstrap/dist/css/bootstrap-reboot.css'
import '@reach/dialog/styles.css'
import {createRoot} from 'react-dom/client'
import {Button, Input, FormGroup, Spinner} from './components/lib'
import {Modal, ModalContents, ModalOpenButton} from './components/modal'
import {Logo} from './components/logo'

function LoginForm({onSubmit, submitButton}) {
>>>>>>> ef80adb8ec75d25a42e6caf4065c62d0c4360881
  function handleSubmit(event) {
    event.preventDefault()
    const {username, password} = event.target.elements

    onSubmit({
      username: username.value,
      password: password.value,
    })
  }

  return (
<<<<<<< HEAD
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input id="username" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" />
      </div>
      <div>
        <button type="submit">{buttonText}</button>
=======
    <form
      onSubmit={handleSubmit}
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
    >
      <FormGroup>
        <label htmlFor="username">Username</label>
        <Input id="username" />
      </FormGroup>
      <FormGroup>
        <label htmlFor="password">Password</label>
        <Input id="password" type="password" />
      </FormGroup>
      <div
        css={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {React.cloneElement(submitButton, {type: 'submit'})}
        <Spinner
          css={{
            marginLeft: '5px',
          }}
        />
>>>>>>> ef80adb8ec75d25a42e6caf4065c62d0c4360881
      </div>
    </form>
  )
}

function App() {
<<<<<<< HEAD
  const [openModal, setOpenModal] = React.useState('none')

=======
>>>>>>> ef80adb8ec75d25a42e6caf4065c62d0c4360881
  function login(formData) {
    console.log('login', formData)
  }

  function register(formData) {
    console.log('register', formData)
  }

  return (
<<<<<<< HEAD
    <div>
      <Logo width="80" height="80" />
      <h1>Bookshelf</h1>
      <div>
        <button onClick={() => setOpenModal('login')}>Login</button>
      </div>
      <div>
        <button onClick={() => setOpenModal('register')}>Register</button>
      </div>
      <Dialog aria-label="Login form" isOpen={openModal === 'login'}>
        <div>
          <button onClick={() => setOpenModal('none')}>Close</button>
        </div>
        <h3>Login</h3>
        <LoginForm onSubmit={login} buttonText="Login" />
      </Dialog>
      <Dialog aria-label="Registration form" isOpen={openModal === 'register'}>
        <div>
          <button onClick={() => setOpenModal('none')}>Close</button>
        </div>
        <h3>Register</h3>
        <LoginForm onSubmit={register} buttonText="Register" />
      </Dialog>
=======
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
            <Button variant="primary" role="button">
              Login
            </Button>
          </ModalOpenButton>
          <ModalContents aria-label="Login form" title="Login">
            <LoginForm
              onSubmit={login}
              submitButton={
                <Button variant="primary" role="button">
                  Login
                </Button>
              }
            />
          </ModalContents>
        </Modal>
        <Modal>
          <ModalOpenButton>
            <Button variant="secondary" role="button">
              Register
            </Button>
          </ModalOpenButton>
          <ModalContents aria-label="Registration form" title="Register">
            <LoginForm
              onSubmit={register}
              submitButton={
                <Button variant="secondary" role="button">
                  Register
                </Button>
              }
            />
          </ModalContents>
        </Modal>
      </div>
>>>>>>> ef80adb8ec75d25a42e6caf4065c62d0c4360881
    </div>
  )
}

const root = createRoot(document.getElementById('root'))
root.render(<App />)
export {root}
