import {loadDevTools} from './dev-tools/load'
import './bootstrap'
import * as React from 'react'
import {createRoot} from 'react-dom/client'
import {App} from './app'
import {AppProviders} from './context'
import {Profiler} from 'components/profiler.exercise'

// ignore the rootRef in this file. I'm just doing it here to make
// the tests I write to check your work easier.
export const rootRef = {}
loadDevTools(() => {
  const root = createRoot(document.getElementById('root'))
  // root.render(
  //   <AppProviders>
  //     <App />
  //   </AppProviders>,
  // )
  // using the inbuilt Profiler instead of own component
  root.render(
    <Profiler
      id="App Root Profiler"
      // onRender={(...args) => console.log(...args)}
      phases={['mount']}
    >
      <AppProviders>
        <App />
      </AppProviders>
    </Profiler>,
  )
  rootRef.current = root
})
