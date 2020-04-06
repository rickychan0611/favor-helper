import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import {auth} from '../../firestore'
import { Button, Form, Grid, Header, Image, Divider, Segment } from 'semantic-ui-react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  ]
}

const SignIn = () => {
  const history = useHistory()
  const [state, setState] = useState({})

  let randomPic = () => {
    return 'https://avatars.dicebear.com/v2/human/' + Math.floor(Math.random() * 100) + '.svg'
  }

  const handleChange = (e, { name, value }) => setState({ ...state, [name]: value })

  const handleSubmit = () => {
    console.log(state)
    auth.signInWithEmailAndPassword(state.email, state.password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode)
      console.log(errorMessage)
    });

    // history.push('/posts')
  }
  return (
    <Grid textAlign='center' style={{ height: 'calc(100vh - 11rem)'}} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 350 }}>
      <Header as='h2' color='grey' textAlign='center'>
      <Image src='https://img.icons8.com/cotton/64/000000/like--v3.png' /> 
      Log-in to your account
      </Header>
      <Form size='large' onSubmit={handleSubmit}>
        <Segment>
          <Form.Input fluid 
          icon='user' 
          iconPosition='left' 
          placeholder='E-mail address' 
          name='email'
          onChange={handleChange}
          />
          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
            name='password'
            onChange={handleChange}
          />
          <Button fluid size='small' color='teal'>
            Sign in
          </Button>
        </Segment>
      </Form>
      <Divider horizontal>Or</Divider>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth}/>
    </Grid.Column>
  </Grid>
  )
}

export default SignIn