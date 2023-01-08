/** @jsx jsx */
import {jsx} from '@emotion/core'

import * as React from 'react'
// need to get the "bookId" param from the router
import {useParams} from 'react-router'
import {client} from 'utils/api-client'
import * as mq from 'styles/media-queries'
import {useAsync} from 'utils/hooks'
import bookPlaceholderSvg from 'assets/book-placeholder.svg'

const loadingBook = {
  title: 'Loading...',
  author: 'loading...',
  coverImageUrl: bookPlaceholderSvg,
  publisher: 'Loading Publishing',
  synopsis: 'Loading...',
  loadingBook: true,
}

function BookScreen({user}) {
  // use the useParams hook, gives us an object with all the params we've specified in the route definition,
  // then access the bookId from that
  const params = useParams()
  const {bookId} = params
  const {data, run} = useAsync()

  React.useEffect(() => {
    run(client(`books/${bookId}`, {token: user.token}))
  }, [run, bookId, user.token])

  const {title, author, coverImageUrl, publisher, synopsis} =
    data?.book ?? loadingBook

  return (
    <div>
      <div
        css={{
          display: 'grid',
          gridTemplateColumns: '1fr 2fr',
          gridGap: '2em',
          marginBottom: '1em',
          [mq.small]: {
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      >
        <img
          src={coverImageUrl}
          alt={`${title} book cover`}
          css={{width: '100%', maxWidth: '14rem'}}
        />
        <div>
          <div css={{display: 'flex', position: 'relative'}}>
            <div css={{flex: 1, justifyContent: 'space-between'}}>
              <h1>{title}</h1>
              <div>
                <i>{author}</i>
                <span css={{marginRight: 6, marginLeft: 6}}>|</span>
                <i>{publisher}</i>
              </div>
            </div>
          </div>
          <br />
          <p>{synopsis}</p>
        </div>
      </div>
    </div>
  )
}

export {BookScreen}
