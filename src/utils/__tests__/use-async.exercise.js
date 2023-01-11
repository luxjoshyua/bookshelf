import {renderHook, act} from '@testing-library/react'
// this is the thing we're testing
import {useAsync} from '../hooks'

// this function provides a way to create a promise which we can imperatively resolve or reject
// whenever we want
function deferred() {
  let resolve, reject
  const promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })
  return {promise, resolve, reject}
}

// Use it like this:
// const {promise, resolve} = deferred()
// promise.then(() => console.log('resolved'))
// do stuff/make assertions you want to before calling resolve
// resolve()
// await promise
// do stuff/make assertions you want to after the promise has resolved

const defaultState = {
  status: 'idle',
  data: null,
  error: null,

  isIdle: true,
  isLoading: false,
  isError: false,
  isSuccess: false,

  run: expect.any(Function),
  reset: expect.any(Function),
  setData: expect.any(Function),
  setError: expect.any(Function),
}

const pendingState = {
  // spread the default in, then override as needed
  ...defaultState,
  status: 'pending',
  isIdle: false,
  isLoading: true,
}

const resolvedState = {
  ...defaultState,
  status: 'resolved',
  isIdle: false,
  isSuccess: true,
}

const rejectedState = {
  ...defaultState,
  status: 'rejected',
  isIdle: false,
  isError: true,
}

test('calling run with a promise which resolves', async () => {
  // get a deferred promise and resolve function from the deferred utility
  const {promise, resolve} = deferred()
  // use renderHook with useAsync to get the result
  // need to destructure this !
  const {result} = renderHook(() => useAsync())
  // assert the result.current is the correct default state
  expect(result.current).toEqual(defaultState)

  // call `run`, passing the promise
  // - this updates state so needs to be done in an `act` callback
  // assert that result.current is the correct pending state
  let p
  act(() => {
    p = result.current.run(promise)
  })

  expect(result.current).toEqual(pendingState)

  // call resolve and wait for the promise to be resolved
  //  - this updates state too and we'll need it to be an async `act` call so we
  // can await the promise
  const resolvedValue = Symbol('resolved value')
  await act(async () => {
    // resolve the deferred promise
    resolve(resolvedValue)
    await p
  })
  // assert the resolved state
  expect(result.current).toEqual({
    ...resolvedState,
    data: resolvedValue,
  })

  // call reset
  act(() => {
    result.current.reset()
  })
  // assert the result.current has been reset
  expect(result.current).toEqual(defaultState)
})

test('calling run with a promise which rejects', async () => {
  // is similar to the previous test, expect we reject the promise instead
  // and assert on the error state

  // to avoid the promise failing the test, catch the promise returned
  // from `run` with `.catch(() => {})`
  // get a deferred promise and resolve function from the deferred utility
  const {promise, reject} = deferred()
  // use renderHook with useAsync to get the result
  const {result} = renderHook(() => useAsync())
  expect(result.current).toEqual(defaultState) // default state is idle

  let p
  act(() => {
    p = result.current.run(promise)
  })

  expect(result.current).toEqual(pendingState)

  // reject the promise
  const rejectedValue = Symbol('rejected value')
  await act(async () => {
    reject(rejectedValue)
    await p.catch(() => {
      /* ignore error */
    })
  })

  // check the returned value
  expect(result.current).toEqual({
    ...rejectedState,
    error: rejectedValue,
  })
})

test('can specify an initial state', async () => {
  // useAsync(customInitialState)
  const mockData = Symbol('resolved value')
  const customInitialState = {status: 'resolved', data: mockData}
  const {result} = renderHook(() => useAsync(customInitialState))
  expect(result.current).toEqual({
    ...resolvedState,
    ...customInitialState,
  })
})

test('can set the data', async () => {
  // result.current.setData('whatever you want')
  const mockData = Symbol('resolved value')
  const {result} = renderHook(() => useAsync())
  act(() => {
    result.current.setData(mockData)
  })
  expect(result.current).toEqual({
    ...resolvedState,
    data: mockData,
  })
})

test.todo('can set the error')
// 💰 result.current.setError('whatever you want')

test.todo('No state updates happen if the component is unmounted while pending')
// 💰 const {result, unmount} = renderHook(...)
// 🐨 ensure that console.error is not called (React will call console.error if updates happen when unmounted)

test.todo('calling "run" without a promise results in an early error')
