import React from 'react'
import {
  Dimmer, Loader
} from 'semantic-ui-react'
import styles from './styles'

const Loading = () => {
  return (
    <>
      <Dimmer active inverted>
          <Loader inverted>loading</Loader>
        </Dimmer>
    </>
  )
}

export default Loading