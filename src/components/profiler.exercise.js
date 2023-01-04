// this is for extra credit
// ref: https://beta.reactjs.org/reference/react/Profiler
import React from 'react'
import {client} from 'utils/api-client'

let queue = []

setInterval(sendProfileQueue, 5000)

function sendProfileQueue() {
  if (!queue.length) {
    return Promise.resolve({success: true})
  }
  const queueToSend = [...queue]
  queue = []
  return client('profile', {data: queueToSend})
}

export function Profiler({phases, ...props}) {
  function reportProfile(
    id, // the "id" prop of the Profiler tree that has just committed
    phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
    actualDuration, // time spent rendering the committed update
    baseDuration, // estimated time to render the entire subtree without memoization
    startTime, // when React began rendering this update
    commitTime, // when React committed this update
    interactions, // the Set of interactions belonging to this update)
  ) {
    if (!phases || phases.includes(phase)) {
      queue.push({
        id,
        phase,
        actualDuration,
        baseDuration,
        startTime,
        commitTime,
        interactions,
      })
    }
    console.log(
      `id: ${id}\n, 
      phase: ${phase}\n, 
      actualDuration: ${actualDuration}\n, 
      baseDuration: ${baseDuration}\n, 
      startTime: ${startTime}\n, 
      commitTime: ${commitTime}\n,
      interactions: ${interactions}`,
    )
  }
  // if we don't spread the props here, the unique id for everywhere
  // we use the Profiler will be undefined
  return <React.Profiler onRender={reportProfile} {...props} />
}
