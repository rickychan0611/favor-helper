import React, { useContext } from 'react'
import { Menu, Dropdown, Responsive, Image, Button, Sidebar, Icon, Segment, Grid } from 'semantic-ui-react'
import { useHistory } from "react-router-dom";
import firebase from 'firebase'
import styles from './styles'
import { UserContext } from '../../context/UserContext'
import { PostsContext } from '../../context/PostsContext'
import logo from '../../assets/images/logo.png'

const options1 = [
  { key: 'sign-in', icon: 'sign-in', text: 'Sign in', value: 'sign-in' },
  { key: 'register', icon: 'edit', text: 'Register', value: 'register' },
]

const options2 = [
  { key: 'sign-out', icon: 'sign-out', text: 'Sign out', value: 'sign-out' },
]


const TopBar = () => {
  const { user, loading, openSideBar, setOpenSideBar } = useContext(UserContext)
  const { preview, setPreview, submitPostToServer } = useContext(PostsContext)

  const history = useHistory()
  const [state, setState] = React.useState({})
  const { activeItem, value } = state


  const signOut = () => {
    firebase.auth().signOut().then(function () {
      console.log("Sign-out successful.")
      alert("You have signed out")
      history.push('/')
    }).catch(function (error) {
      console.log(error)
    })
  }

  const handleItemClick = (e, { name }) => {
    setState({ activeItem: name })
    if (name === 'sign-out') {
      signOut()
    }
    if (name === 'create-post') {
      if (!user) {
        alert('please login')
        return
      }
      else {
        history.push(`/${name}`)
      }
    }
    else {
      history.push(`/${name}`)
      console.log(name)
    }
  }

  const onDropdownClick = (e, { value }) => {
    console.log('Value' + value)
    setState({ activeItem: value })
    if (value === 'sign-out') {
      signOut()
    } else {
      history.push(`/${value}`)
    }
  }

  const EditOrPreviewButtons = () => (
    <>
      {preview ?
        // Edit or preview/
        <Menu.Item
          name='create-post'
          onClick={() => setPreview(!preview)}
        >
          <Button icon="edit" content="Edit" color="teal" />
        </Menu.Item>
        :
        <Menu.Item
          name='create-post'
          onClick={() => setPreview(!preview)}
        >
          <Button icon="save" content="Save as draft" color="teal" />
        </Menu.Item>
      }
    </>
  )

  const PreviewSaveCancelButtons = () => (
    <>

      <EditOrPreviewButtons />

      <Menu.Menu position='right'>

      </Menu.Menu>
      <Menu.Item
        onClick={(() => {
          setState({ activeItem: 'posts' })
          submitPostToServer()
        })}
      >
        <Button icon="check" circular content="PUBLISH" color="green" />
      </Menu.Item>


      <Menu.Item
        onClick={handleItemClick}
      >
        <Button icon="close" circular color="grey" />
      </Menu.Item>

    </>
  )

  const TopBarItem = ({ children, name }) => (
    <Menu.Item
      name={name}
      active={activeItem === name}
      onClick={handleItemClick}
    >
      {children}
    </Menu.Item>
  )

  return (
    <>
      <Responsive minWidth={801} as={React.Fragment}>
        {/* ************* Top Bar ******************/}
        <Sidebar
          icon='labeled'
          visible={true}
          direction="top"
          style={{ zIndex: 4000 }}
        >
          <Segment basic
            style={{
              backgroundColor: 'white',
              postion: 'absolute',
              width: '100%',
              height: 70,
              overflow: 'hidden'

            }}>
            <div style={{
              width: '100%',
              display: "flex",
              alignItems: "center",
            }}>
              <div style={{
                marginLeft: 5
              }}>
                <Icon name='bars' size="large" style={{ color: '#707070' }}
                  onClick={() => { setOpenSideBar(!openSideBar) }} /></div>
              <img style={{ marginLeft: 20 }} src={logo} height={44} 
              onClick={() => { history.push('/posts') }}/>
              <div style={{
                marginLeft: 'auto',
                marginRight: 0,
                display: "flex",
                alignItems: "center",
              }}>
                <span style={{
                  fontSize: 21, color: '#707070', marginRight: 30, cursor: 'pointer'
                }}
                  onClick={() => { history.push('/posts') }} >
                  <Icon name='food' />Browse Meals</span>
                <span style={{
                  fontSize: 21, color: '#707070', marginRight: 30, cursor: 'pointer'
                }}
                  onClick={() => { history.push('/my-orders') }} >
                  <Icon name='unordered list' />My Orders</span>
                <span style={{
                  fontSize: 21, color: '#707070', marginRight: 30, cursor: 'pointer'
                }}
                  onClick={() => {
                    history.push('/messages')
                  }}><Icon name='talk' />My Messages</span>
                {user ?
                  <img src={user.photoURL}
                    style={{ width: 40, borderRadius: '50%' }}
                    onClick={() => { history.push('/profile') }} />
                  : null}
              </div>
            </div>

          </Segment>
        </Sidebar>
      </Responsive>

      <Responsive maxWidth={800} as={React.Fragment}>
        {/* ************* Top Bar ******************/}
        <Sidebar
          icon='labeled'
          visible={true}
          direction="top"
          style={{ zIndex: 4000 }}
        >
          <Segment basic
            style={{
              backgroundColor: 'white',
              postion: 'absolute',
              width: '100%',
              height: 70,
              overflow: 'hidden'

            }}>
            <Grid textAlign='center' verticalAlign='middle' column={3}>
              <Grid.Column width={2} >
                <Icon name='bars' size="large" style={{ color: '#707070' }}
                  onClick={() => { setOpenSideBar(!openSideBar) }} />
              </Grid.Column>
              <Grid.Column width={2} >
                {user ?
                  <img src={user.photoURL}
                    style={{ width: 40, borderRadius: '50%' }}
                    onClick={() => { history.push('/profile') }} />
                  : null}
              </Grid.Column>
              <Grid.Column width={8}>
                <img src={logo} height={40} 
                onClick={() => { history.push('/posts') }}/>
              </Grid.Column>
              <Grid.Column width={2}>
                <Icon name='bell' size="large" style={{ color: '#707070' }} />
              </Grid.Column>
              <Grid.Column width={2}>
                <Icon name='talk' size="large" style={{ color: '#707070' }} />
              </Grid.Column>
            </Grid>

          </Segment>
        </Sidebar>
      </Responsive>
      {/* <Grid textAlign='center' verticalAlign='middle' column={3}>
              <Grid.Column width={2} >
                <Icon name='bars' size="large" style={{ color: '#707070' }} 
                onClick={()=>{setOpenSideBar(!openSideBar)}}/>
              </Grid.Column>
              <Grid.Column width={2} >
                {user ?
                  <img src={user.photoURL}
                    style={{ width: 40, borderRadius: '50%' }}
                    onClick={() => { history.push('/profile') }} />
                  : null}
              </Grid.Column>
              <Grid.Column width={8}>
                <img src={logo} height={40} />
              </Grid.Column>
              <Grid.Column width={2}>
                <Icon name='bell' size="large" style={{ color: '#707070' }} />
              </Grid.Column>
              <Grid.Column width={2}>
                <Icon name='talk' size="large" style={{ color: '#707070' }} />
              </Grid.Column>
            </Grid> */}

      {/* <Menu borderless fluid style={{ position: "fixed", height: 55 , zIndex: 3000}}>
        {user ? null :
          <div style={{ position: "relative", height: 40 }}>
            <img src='https://img.icons8.com/cotton/64/000000/like--v3.png'
              style={{ width: 40, height: 40, marginTop: 7, marginLeft: 5, marginRight: -10 }}
              onClick={() => { history.push('/') }} />
          </div>
        }
        {activeItem === 'create-post' && user ?
          <PreviewSaveCancelButtons />
          :
          <>
            <TopBarItem name='create-post'>
              <Button color="teal"> Create a post </Button>
            </TopBarItem>
          </>
        }
        {activeItem === 'create-post' && user ?
          null :
          <>
            <TopBarItem name='posts'> Posts </TopBarItem>
            <TopBarItem name='map' > Map </TopBarItem>

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
              : null
            }

          </>}

      </Menu> */}
    </>
  )
}

export default TopBar