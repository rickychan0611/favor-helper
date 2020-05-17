import React, { Children } from 'react'
import {
  Button,
} from 'semantic-ui-react'

const CloseButton = ({children, setClick}) => {
  return (
    <>
      <Button icon="close" content='Close' 
      style={{ backgroundColor: "#bcbbbd", color: "white" }}
      onClick={()=>{setClick()}}>
        {children}
      </Button>
    </>
  )
}

export default CloseButton