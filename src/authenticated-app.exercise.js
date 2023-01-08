/** @jsx jsx */
import {jsx} from '@emotion/core'
<<<<<<< HEAD

import * as React from 'react'
import {Routes, Route, Link, useMatch} from 'react-router-dom'
import {Button} from './components/lib'
import * as mq from './styles/media-queries'
import * as colors from './styles/colors'
import {DiscoverBooksScreen} from 'screens/discover'
import {BookScreen} from 'screens/book'
import {NotFoundScreen} from 'screens/not-found'

function AuthenticatedApp({user, logout}) {
  return (
    <React.Fragment>
=======
import {Routes, Route, Link as RouterLink, useMatch} from 'react-router-dom'
import {ErrorBoundary} from 'react-error-boundary'
import {Button, ErrorMessage, FullPageErrorFallback} from './components/lib'
import * as mq from './styles/media-queries'
import * as colors from './styles/colors'
import {useAuth} from './context/auth-context'
import {ReadingListScreen} from './screens/reading-list'
import {FinishedScreen} from './screens/finished'
import {DiscoverBooksScreen} from './screens/discover'
import {BookScreen} from './screens/book'
import {NotFoundScreen} from './screens/not-found'

function ErrorFallback({error}) {
  return (
    <ErrorMessage
      error={error}
      css={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    />
  )
}

function AuthenticatedApp() {
  // get user and logout function from AuthContext using useContext
  const {user, logout} = useAuth()

  return (
    <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
>>>>>>> 546257ba3f76fa91b42bf52212d713ab8259f8b3
      <div
        css={{
          display: 'flex',
          alignItems: 'center',
          position: 'absolute',
          top: '10px',
          right: '10px',
        }}
      >
        {user.username}
        <Button variant="secondary" css={{marginLeft: '10px'}} onClick={logout}>
          Logout
        </Button>
      </div>
      <div
        css={{
          margin: '0 auto',
          padding: '4em 2em',
          maxWidth: '840px',
          width: '100%',
          display: 'grid',
          gridGap: '1em',
          gridTemplateColumns: '1fr 3fr',
          [mq.small]: {
            gridTemplateColumns: '1fr',
            gridTemplateRows: 'auto',
            width: '100%',
          },
        }}
      >
        <div css={{position: 'relative'}}>
          <Nav />
        </div>
        <main css={{width: '100%'}}>
<<<<<<< HEAD
          <AppRoutes user={user} />
        </main>
      </div>
    </React.Fragment>
=======
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <AppRoutes />
          </ErrorBoundary>
        </main>
      </div>
    </ErrorBoundary>
>>>>>>> 546257ba3f76fa91b42bf52212d713ab8259f8b3
  )
}

function NavLink(props) {
  const match = useMatch(props.to)
<<<<<<< HEAD

  // if the props.to === matches, apply the active class

  return (
    <Link
      // css={{
      //   display: 'block',
      //   padding: '8px 15px 8px 10px',
      //   margin: '5px 0',
      //   width: '100%',
      //   height: '100%',
      //   color: colors.text,
      //   borderRadius: '2px',
      //   borderLeft: '5px solid transparent',
      //   ':hover': {
      //     color: colors.indigo,
      //     textDecoration: 'none',
      //     background: colors.gray10,
      //   },
      // }}
      css={[
        // styles 1
=======
  return (
    <RouterLink
      css={[
>>>>>>> 546257ba3f76fa91b42bf52212d713ab8259f8b3
        {
          display: 'block',
          padding: '8px 15px 8px 10px',
          margin: '5px 0',
          width: '100%',
          height: '100%',
          color: colors.text,
          borderRadius: '2px',
          borderLeft: '5px solid transparent',
          ':hover': {
            color: colors.indigo,
            textDecoration: 'none',
            background: colors.gray10,
          },
        },
<<<<<<< HEAD
        // styles 2
=======
>>>>>>> 546257ba3f76fa91b42bf52212d713ab8259f8b3
        match
          ? {
              borderLeft: `5px solid ${colors.indigo}`,
              background: colors.gray10,
              ':hover': {
<<<<<<< HEAD
                background: colors.gray20,
=======
                background: colors.gray10,
>>>>>>> 546257ba3f76fa91b42bf52212d713ab8259f8b3
              },
            }
          : null,
      ]}
      {...props}
    />
  )
}

function Nav() {
  return (
    <nav
      css={{
        position: 'sticky',
        top: '4px',
        padding: '1em 1.5em',
        border: `1px solid ${colors.gray10}`,
        borderRadius: '3px',
        [mq.small]: {
          position: 'static',
          top: 'auto',
        },
      }}
    >
      <ul
        css={{
          listStyle: 'none',
          padding: '0',
        }}
      >
        <li>
<<<<<<< HEAD
=======
          <NavLink to="/list">Reading List</NavLink>
        </li>
        <li>
          <NavLink to="/finished">Finished Books</NavLink>
        </li>
        <li>
>>>>>>> 546257ba3f76fa91b42bf52212d713ab8259f8b3
          <NavLink to="/discover">Discover</NavLink>
        </li>
      </ul>
    </nav>
  )
}

<<<<<<< HEAD
function AppRoutes({user}) {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/discover" element={<DiscoverBooksScreen user={user} />} />
        <Route path="/book/:bookId" element={<BookScreen user={user} />} />
        <Route path="*" element={<NotFoundScreen />} />
      </Routes>
    </div>
=======
function AppRoutes() {
  return (
    <Routes>
      <Route path="/list" element={<ReadingListScreen />} />
      <Route path="/finished" element={<FinishedScreen />} />
      <Route path="/discover" element={<DiscoverBooksScreen />} />
      <Route path="/book/:bookId" element={<BookScreen />} />
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
>>>>>>> 546257ba3f76fa91b42bf52212d713ab8259f8b3
  )
}

export {AuthenticatedApp}
<<<<<<< HEAD

/*
eslint
  jsx-a11y/anchor-has-content: "off",
*/
=======
>>>>>>> 546257ba3f76fa91b42bf52212d713ab8259f8b3
