import React, { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { Menu, Dropdown, Segment, Image, Loader, Dimmer } from 'semantic-ui-react'

import styles from './styles'

const Profile = () => {
  const  {user}  = useContext(UserContext)
  console.log(user)
  return (
    <div>
      {!user.loading ?
        <>
          <h1>Profile</h1>
          <Image src={user.photoURL} size='tiny' circular />
          <p></p>
          <p>id: {user.uid}</p>
          <p>name: {user.displayName}</p>
          <p>email: {user.email}</p>
          <p>posts: null</p>
          <p>messages: null</p>
        </>
        :
        <>
          <Segment>
            <Dimmer active>
              <Loader size='medium'>Loading</Loader>
            </Dimmer>
          </Segment>
        </>
      }
    </div>
  )
}

export default Profile