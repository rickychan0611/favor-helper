import React, { useContext, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import { useHistory } from "react-router-dom";
import { SignInModal } from '../../components'

import {
  Menu,
  Sidebar,
  Icon,
  Confirm,
  Divider
} from 'semantic-ui-react'
import styles from './styles'

const SideNavBar = ({ setNavDim }) => {
  const { user, loading, openSideBar, setOpenSideBar, signOut } = useContext(UserContext)
  const history = useHistory()
  const [openSignInModal, setOpenSignInModal] = useState(false)

  const handleClick = (e, { name }) => {
    if (
      name == "/create-post" ||
      name == "/messages" ||
      name == "/notifications" ||
      name == "/messages" ||
      name == "/my-orders" ||
      name == "/profile" ||
      name == "/my-sales"
    ) {
      if (user == "not signed in") {
        // alert("please sign in")
        setOpenSignInModal(true)
      }
      else { history.push(name) }
    }
    else {
      history.push(name)
    }
    setOpenSideBar(false)
  }

  const [confirm, setConfirm] = useState()
  const handleConfirm = () => {
    signOut()
    history.push('/')
    setConfirm(false)
  }

  return (
    <div>
      <SignInModal openSignInModal={openSignInModal} setOpenSignInModal={setOpenSignInModal} />

      <Sidebar
        animation='overlay'
        icon='labeled'
        // inverted
        vertical
        visible={openSideBar}
        onVisible={() => setNavDim(true)}
        onHide={() => {
          setOpenSideBar(false)
          setNavDim(false)
        }}
        style={{ zIndex: 2000, backgroundColor: "#f0f5ff", paddingLeft: 15 }}
      >
        <Menu size='large' vertical secondary
          style={{
            paddingTop: 90, height: "100%", width: '99%'
          }}>
          <Menu.Menu position="rigth">
            <Menu.Item onClick={() => { setOpenSideBar(false) }}>
              &nbsp;
              <Icon name="arrow circle left" size="large" color="grey" />
            </Menu.Item>
          </Menu.Menu>
          <Menu.Item name="/posts" onClick={handleClick}>Browse Meals</Menu.Item>
          <Menu.Item name="/messages" onClick={handleClick}>Messages</Menu.Item>
          <Menu.Item name="/notifications" onClick={handleClick}>Notifications</Menu.Item>
          <Menu.Item name="/my-orders" onClick={handleClick}>My Orders</Menu.Item>
          <Menu.Item name="/profile" onClick={handleClick}>My Profile</Menu.Item>
          <Divider />
          <Menu.Item name="/create-post" onClick={handleClick}>Create a Meal</Menu.Item>
          <Menu.Item name="/profile" onClick={handleClick}>My Posts</Menu.Item>
          <Menu.Item name="/my-sales" onClick={handleClick}>My Sales</Menu.Item>

          {user == 'not signed in' ?
            <>
              <Divider />
              <Menu.Item name="/sign-in" onClick={handleClick}>Sign In</Menu.Item>
              <Menu.Item name="/register" onClick={handleClick}>Register</Menu.Item>
            </> :
            <>
              <Divider />
              <Menu.Item name="/log-out" onClick={() => {
                setOpenSideBar(false)
                setConfirm(true)
              }}>
                Log Out
          </Menu.Item>
            </>
          }
        </Menu>

      </Sidebar>
      <Confirm
        open={confirm}
        content='Are you sure to logout?'
        onCancel={() => setConfirm(false)}
        onConfirm={handleConfirm}
      />
    </div>
  )
}

export default SideNavBar