import React from 'react'
import { Icon } from 'semantic-ui-react'

import styles from './styles'

const PreviewIcon = ({ preview }) => {
  return (
    <>
      {preview ? null :
        <Icon name='edit' color="olive" style={{
          display: "inline-block", marginRight: 10
        }}
        />
      }
    </>
  )
}

export default PreviewIcon