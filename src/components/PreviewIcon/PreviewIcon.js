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
        <p style={required ? {color:  'red', margin: 0} : {color:'grey',  margin: 0}}><Icon name='edit' color={color} style={{
          display: "inline-block", marginRight: 10, marginTop: 0
        }}
        />
        {required ? 'required' : 'optional'}
        </p>
      }
    </>
  )
}

export default PreviewIcon