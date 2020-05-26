import React, { Children } from 'react'
import {
  Button,
} from 'semantic-ui-react'

const FavButton = ({children, clicked, disable}) => {
  return (
    <>
      <Button 
      style={{
        backgroundImage: 'linear-gradient(to top right, #7775fa, #9a99f0)',
        color: "white"
      }}
      onClick={clicked}
      disabled={disable}
      >
        {children}
      </Button>
    </>
  )
}

export default FavButton