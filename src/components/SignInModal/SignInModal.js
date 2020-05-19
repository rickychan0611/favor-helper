import React, { useContext } from 'react'
import {
  Modal,
  Button,
  Header,
  Icon,
} from 'semantic-ui-react'
import styles from './styles'
import { useHistory } from "react-router-dom";

const SignInModal = ( {openSignInModal, setOpenSignInModal} ) => {
  const history = useHistory()
  return (
    <>
      <Modal open={openSignInModal} size="mini">
        <Modal.Header
          style={{
            backgroundImage: 'linear-gradient(to top right, #9991c9, #e5c1cd)',
            color: "white",
            marginBottom: 15
          }}>
          <Icon name="warning sign" />Please Sign In
        </Modal.Header>
        <Modal.Content>
          <Header icon>
            Sorry, you need to sign in first.
             </Header>
        </Modal.Content>
        <Modal.Actions>
          <Button style={{ backgroundColor: "#bcbbbd", color: "white" }}
            onClick={() => { setOpenSignInModal(false) }}>
            <Icon name='close' /> Cancel
          </Button>
          <Button style={{
            backgroundImage: 'linear-gradient(to top right, #7775fa, #9a99f0)',
            color: "white"
          }}
            onClick={() => {
              history.push('/sign-in')
              setOpenSignInModal(false)
            }}>
            Sign in<Icon name='arrow right' />
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  )
}

export default SignInModal