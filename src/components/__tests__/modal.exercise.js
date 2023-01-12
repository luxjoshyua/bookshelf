import React from 'react'
import {render, screen, within} from '@testing-library/react'
import {Modal, ModalContents, ModalOpenButton} from '../modal'
import userEvent from '@testing-library/user-event'

test('can be opened and closed', async () => {
  // render the Modal, ModalOpenButton, and ModalContents
  const label = 'Modal label'
  const title = 'Modal title'
  const content = 'Modal contents'

  render(
    <Modal>
      <ModalOpenButton>
        <button>Open</button>
      </ModalOpenButton>
      <ModalContents aria-label="Modal label" title="Modal title">
        {/* <div>Modal content</div> */}
        <div>{content}</div>
      </ModalContents>
    </Modal>,
  )

  // click the open button
  const openBtn = screen.getByRole('button', {name: /open/i})
  await userEvent.click(openBtn)

  // screen.getByRole('hei') // shows the accessible roles, great way to test !
  // screen.debug()

  // verify the modal contains the modal contents, title, and label
  const modal = screen.getByRole('dialog')
  expect(modal).toHaveAttribute('aria-label', label)
  // scopes queries down to this specific modal
  const inModal = within(modal)
  expect(inModal.getByRole('heading', {name: title})).toBeInTheDocument()
  expect(inModal.getByText(content)).toBeInTheDocument()

  // click the close button
  const closeBtn = screen.getByRole('button', {name: /close/i})
  // all userEvent utilities are async, so we need to await them
  await userEvent.click(closeBtn)

  // verify the modal is no longer rendered
  // (use `query*` rather than `get*` or `find*` queries to verify it is not rendered)
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
})
