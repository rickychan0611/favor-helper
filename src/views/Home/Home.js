import React from 'react'
import { Button, Header, Icon, Segment, Input } from 'semantic-ui-react'
import { useHistory } from "react-router-dom";
import logo from '../../assets/images/logo.png'
import mainPic from '../../assets/images/main.png'

import styles from './styles'

const Home = () => {
  const history = useHistory()

  return (
    <div style={{
      backgroundImage: `url(${mainPic})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      backgroundPosition: 'top center',
      marginTop: -85
    }}>
      {/* <div style={{position: 'fixed'}}>
      <img style={{ width: 100, margin: 20, filter: 'drop-shadow(0px 0px 10px white)' }} src={logo} />
      </div> */}
      <div style={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        flexDirection: 'column'
      }}>
        <div style={{width: '90vw', maxWidth: 500, textAlign: "center", filter: 'drop-shadow(0px 0px 10px black)'}}>
        <h1>Welcome to Urban Favor</h1></div><br />
        <div style={{ width: '90vw', maxWidth: 500 }}>
          <Input fluid placeholder="Enter Your Address" size="huge" 
           style={{filter: 'drop-shadow(0px 0px 10px grey)'
        }}/><br />
          <Button fluid size="large"
            style={{
              backgroundImage: 'linear-gradient(to top right, #7775fa, #9a99f0)',
              color: "white",
              filter: 'drop-shadow(0px 0px 10px grey)'
            }}><Icon name='food' />FIND MEALS NEARBY</Button></div>
      </div>
    </div>
  )
}

export default Home