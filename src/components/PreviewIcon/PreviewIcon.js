import React from 'react'
import { Icon } from 'semantic-ui-react'

import styles from './styles'

const PreviewIcon = ({ preview, required }) => {
  let color = ""
  if (required) {
    color="red"
  }
  else {
    color="olive"

  }
  return (
    <>
      {preview ? null :
        <p style={required ? {color:  'red'} : {color:'grey'}}><Icon name='edit' color={color} style={{
          display: "inline-block", marginRight: 10
        }}
        />
        {required ? 'required' : 'optional'}
        </p>
      }
    </>
  )
}

export default PreviewIcon