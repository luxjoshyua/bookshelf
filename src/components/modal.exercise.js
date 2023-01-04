/** @jsx jsx */
import {jsx} from '@emotion/core'
// Dialog component is a light wrapper around ReachUI Dialog
// https://reach.tech/dialog/
import {Dialog, CircleButton} from './lib'
import React from 'react'
import VisuallyHidden from '@reach/visually-hidden'

// how the components will be used
/*
<Modal>
  <ModalOpenButton>
    <button>Open Modal</button>
  </ModalOpenButton>
  <ModalContents aria-label="Modal label (for screen readers)">
    <ModalDismissButton>
      <button>Close Modal</button>
    </ModalDismissButton>
    <h3>Modal title</h3>
    <div>Some great contents of the modal</div>
  </ModalContents>
</Modal>
*/

// this set of compound components needs to be structurally flexible,
// meaning we don't have control over the structure of the components,
// but we still want to have implicitly shared state, so use context
const ModalContext = React.createContext()

/**
 * Modal component
 *  - manages the isOpen state (via useState)
 *  - renders the ModalContext.Provider with the value which will pass the isOpen state and setIsOpen function
 */
function Modal(props) {
  const [isOpen, setIsOpen] = React.useState(false)
  const value = [isOpen, setIsOpen]
  // don't forget to spread the props, otherwise whole thing breaks!
  return <ModalContext.Provider value={value} {...props} />
  // also works
  // return <ModalContext.Provider value={[isOpen, setIsOpen]} {...props} />
}

/**
 * ModalDismissButton component
 *  - accepts children which is the button we want to clone to set its onClick prop to trigger the modal to close
 *  https://beta.reactjs.org/reference/react/cloneElement
 *  - get the setIsOpen function from useContext
 *  - the children prop is a single child - the user's button - so alias children to child in the arg
 */
function ModalDismissButton({children: child}) {
  const [, setIsOpen] = React.useContext(ModalContext)
  // child (the button) is the element we want to clone/copy
  return React.cloneElement(child, {
    // onClick: () => setIsOpen(false),
    onClick: callAll(() => setIsOpen(false), child.props.onClick),
  })
}

/**
 * ModalOpenButton component
 *  - effectively the same as ModalDismissButton, except onClick sets isOpen to true
 */
function ModalOpenButton({children: child}) {
  const [, setIsOpen] = React.useContext(ModalContext)

  // child (the button) is the element we want to clone, second arg are the props, third arg (not passed) is the children e.g. 'Button Text'
  // return React.cloneElement(child, {
  //   // need to return more than one thing here
  //   onClick: () => setIsOpen(true),
  // })

  return React.cloneElement(child, {
    // prefer this syntax than the below
    // onClick: () => {
    //   setIsOpen(true)
    //   console.log('something else happening')
    // },
    onClick: callAll(() => setIsOpen(true), child.props.onClick),
    // onClick: (...args) => {
    //   setIsOpen(true)
    //   if (child.props.onClick) {
    //     child.props.onClick(...args)
    //   }
    // },
  })
}

// ref: https://stackoverflow.com/questions/68862702/react-onclick-callall-functions-syntax
const callAll =
  // any number of functions


    (...fns) =>
    // return a function that accepts any number of arguments
    (...args) =>
      // when these functions are called, for each function, if it exists, call with the args passed
      fns.forEach(fn => fn && fn(...args))

/**
 * ModalContentsBase component
 *  - renders the Dialog component
 *  - set the isOpen prop
 *  - set onDismiss prop which sets isOpen to close
 *  - forward along the rest of the props (especially children)
 */
function ModalContentsBase({children, ...props}) {
  const [isOpen, setIsOpen] = React.useContext(ModalContext)
  return (
    <Dialog
      isOpen={isOpen}
      onDismiss={() => setIsOpen(false)}
      {...props}
      aria-label="modal"
    >
      {children}
    </Dialog>
  )
}

const CircleDismissButton = () => (
  <div css={{display: 'flex', justifyContent: 'flex-end'}}>
    <ModalDismissButton>
      <CircleButton>
        <VisuallyHidden>Close</VisuallyHidden>
        <span aria-hidden>×</span>
      </CircleButton>
    </ModalDismissButton>
  </div>
)

/**
 * ModalContents component
 *  - renders the Dialog component
 *  - set the isOpen prop
 *  - set onDismiss prop which sets isOpen to close
 *  - forward along the rest of the props (especially children)
 *  - renders the circle dismiss button
 *  - renders the h3 title
 */
function ModalContents({title, children, ...props}) {
  return (
    <ModalContentsBase {...props}>
      <CircleDismissButton />
      <h3 css={{textAlign: 'center', fontSize: '2em'}}>{title}</h3>
      {children}
    </ModalContentsBase>
  )
}

// export the components
export {Modal, ModalDismissButton, ModalOpenButton, ModalContents}
