import React, { useContext } from 'react'
import { Menu, Dropdown, Responsive, Image, Button, Dimmer } from 'semantic-ui-react'
import { useHistory } from "react-router-dom";
import firebase from 'firebase'
import styles from './styles'
import { UserContext } from '../../context/UserContext'
import { PostsContext } from '../../context/PostsContext'

const options1 = [
  { key: 'sign-in', icon: 'sign-in', text: 'Sign in', value: 'sign-in' },
  { key: 'register', icon: 'edit', text: 'Register', value: 'register' },
]

const options2 = [
  { key: 'sign-out', icon: 'sign-out', text: 'Sign out', value: 'sign-out' },
]

const signOut = () => {
  firebase.auth().signOut().then(function () {
    console.log("Sign-out successful.")
    alert("You have signed out")
  }).catch(function (error) {
    console.log(error)
  })
}

const TopBar = () => {
  const { user, loading } = useContext(UserContext)
  const { preview, setPreview } = useContext(PostsContext)

  const history = useHistory()
  const [state, setState] = React.useState({})
  const { activeItem, value } = state

  const handleItemClick = (e, { name }) => {
    setState({ activeItem: name })
    if (name === 'sign-out') {
      signOut()
    } else {
      history.push(`/${name}`)
      console.log(name)
    }
  }

  const onDropdownClick = (e, { value }) => {
    console.log('Value' + value)
    if (value === 'sign-out') {
      signOut()
    } else {
      history.push(`/${value}`)
    }
  }


  return (
    <Menu borderless fluid
    >
      {!user ?
        <Menu.Item
          name=''
          onClick={handleItemClick}
        >
          <img src='https://img.icons8.com/cotton/64/000000/like--v3.png' />
        </Menu.Item>
        :
        activeItem === 'create-post' ?
        <>

            {preview ?

            <Menu.Item
              name='create-post'
              active={activeItem === 'create-post'}
              onClick={()=>setPreview(!preview)}
            >
              <Button color="red"> Edit </Button>
            </Menu.Item>
            :
            <Menu.Item
              name='create-post'
              active={activeItem === 'create-post'}
              onClick={()=>setPreview(!preview)}
            >
              <Button color="red"> Preview </Button>
            </Menu.Item>
            }


        <Menu.Item
          name='create-post'
          active={activeItem === 'create-post'}
          onClick={(()=>{alert('save post')})}
        >
          <Button color="teal"> Save Post </Button>
        </Menu.Item>
        <Menu.Item
          name='home'
          active={activeItem === 'home'}
          onClick={handleItemClick}
        >
          <Button color="grey"> Cancel </Button>
        </Menu.Item>
        </>
        :
        <Menu.Item
          name='create-post'
          active={activeItem === 'create-post'}
          onClick={handleItemClick}
        >
          <Button color="teal"> create a post </Button>
        </Menu.Item>

      }
      <Menu.Item
        name='posts'
        active={activeItem === 'posts'}
        onClick={handleItemClick}
      >
        Posts
      </Menu.Item>

      <Menu.Item
        name='map'
        active={activeItem === 'map'}
        onClick={handleItemClick}
      >
        Map
      </Menu.Item>

      {!loading ?
        <Menu.Menu position='right'>
          <Responsive minWidth={531} as={React.Fragment}>
            {!user ?
              <>
                <Menu.Item
                  name='sign-in'
                  active={activeItem === 'sign-in'}
                  onClick={handleItemClick}
                >
                  Sign In
             </Menu.Item>
                <Menu.Item
                  name='register'
                  active={activeItem === 'register'}
                  onClick={handleItemClick}
                >
                  Register
            </Menu.Item>
              </>
              :
              <>
                <Menu.Item
                  name='profile'
                  active={activeItem === 'profile'}
                  onClick={handleItemClick}
                >
                  <Image src={user.photoURL} avatar />
                  <span>{user.displayName}</span>
                </Menu.Item>
                <Menu.Item
                  name='sign-out'
                  active={activeItem === 'sign-out'}
                  onClick={handleItemClick}
                >
                  Sign-out
            </Menu.Item>
              </>
            }

          </Responsive>
          <Responsive maxWidth={530} as={React.Fragment}>
            <Menu.Item>
              {user ?
                <Image src={user.photoURL} avatar
                  onClick={() => { history.push('/profile') }} />
                : null}
              <Dropdown
                icon='bars'
                floating
                options={!user ? options1 : options2}
                trigger={<React.Fragment />}
                value={value}
                onChange={onDropdownClick}
              />
            </Menu.Item>
          </Responsive>
        </Menu.Menu>
        : null}
    </Menu>
  )
}

export default TopBar