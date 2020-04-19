import React, { useState, useContext } from 'react'
import { useHistory, Link } from "react-router-dom";
import { auth } from '../../firestore'
import { Message, Button, Form, Grid, Header, Image, Divider, Segment } from 'semantic-ui-react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import { UserContext } from '../../context/UserContext'
import db from '../../firestore'

const SignIn = () => {
  const history = useHistory()
  const [state, setState] = useState({})
  const { AuthState } = useContext(UserContext)

  // Configure FirebaseUI.
  const uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function (authResult, redirectUrl) {
        const userRef = db.collection('users').doc(authResult.user.uid)
        userRef.get()
          .then((snapShot) => {
            if (snapShot.exists){
              return true
            }
            else {
              userRef.set({
                id: authResult.user.uid,
                uid: authResult.user.uid,
                displayName: authResult.user.displayName,
                photoURL: authResult.user.photoURL + "?type=large",
                email: authResult.user.email,
                emailVerified: authResult.user.emailVerified
              })
              return true
            }
          })
         }
    },
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/posts',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ]
  }

  const handleChange = (e, { name, value }) => setState({ ...state, [name]: value })

  const handleSubmit = () => {
    auth.signInWithEmailAndPassword(state.email, state.password)
      .then(function (result) {
        history.push('/posts')
        AuthState()
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode)
        console.log(errorMessage)
        alert(errorMessage)
      });

  }
  return (
    <>
      <Segment basic style={{ height: '90vh' }}>
        <Grid textAlign='center' style={{ height: 'calc(100vh - 6rem)' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 400 }}>
            <Header as='h2' color='grey' textAlign='center'>
              <Image src='https://img.icons8.com/cotton/64/000000/like--v3.png' />
      Log-in to your account
      </Header>
            <Form size='large' onSubmit={handleSubmit} >
              <Segment>
                <Form.Input fluid required
                  icon='user'
                  iconPosition='left'
                  placeholder='E-mail address'
                  name='email'
                  onChange={handleChange}
                />
                <Form.Input required
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
        New to us? <Link to='/register'>Sign Up</Link>
            <Divider horizontal>Or</Divider>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
          </Grid.Column>
        </Grid>
      </Segment>
    </>
  )
}

export default SignIn