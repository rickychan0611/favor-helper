import React, { useState } from 'react'
import db from '../../firestore'
import posts from '../../data/posts.json'
import { useHistory } from "react-router-dom";
import { firebase } from '@firebase/app';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import validatePassword from '../../functions/validatePassword'
import styles from './styles'

const SignIn = () => {
  const history = useHistory()
  const [state, setState] = useState({
    title: '',
    location: '',
    jobDate: '',
    budget: 0,
    desc: '',
    authorPic : ''
  })

  let randomPic = () => {
    return 'https://avatars.dicebear.com/v2/human/' + Math.floor(Math.random() * 100) + '.svg'
  }

  const handleChange = (e, { name, value }) => setState({ ...state, [name]: value })

  const handleSubmit = () => {
    setState({ ...state, submitted: true })

   const timestamp = new Date()

    let newPost = db.collection("posts").doc()
    newPost.set(
      { ...state, 
        id: newPost.id, 
        authorPic: randomPic(),
        createAt: timestamp}
      )
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      })

    history.push('/posts')
  }
  return (
    <Grid textAlign='center' style={{ height: 'calc(100vh - 11rem)'}} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 350 }}>
      <Header as='h2' color='grey' textAlign='center'>
      <Image src='https://img.icons8.com/cotton/64/000000/like--v3.png' /> 
      Log-in to your account
      </Header>
      <Form size='large'>
        <Segment>
          <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' />
          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
          />
          <Button fluid size='large'>
            Sign in
          </Button>
        </Segment>
      </Form>
      <Message>
        New to us? <a href='#'>Sign Up</a>
      </Message>
    </Grid.Column>
  </Grid>
  )
}

export default SignIn