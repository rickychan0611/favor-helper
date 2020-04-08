import React, { useState, useEffect } from 'react'
import { useHistory, Link } from "react-router-dom";
import { Button, Form, Grid, Header, Image, Message, Segment, Icon, Container } from 'semantic-ui-react'
import validatePassword from '../../functions/validatePassword'
import { auth } from '../../firestore'
import registerValidation from '../../functions/registerValidation'
import styles from './styles'

const fields = [
  { name: 'first-name', label: 'First Name', type: 'text' },
  { name: 'last-name', label: 'Last Name', type: 'text' },
  { name: 'email', label: 'Email', type: 'text' },
  { name: 'password', label: 'Password (min. 6 characters and at least 1 uppercase and 1 digit)', type: 'password', icon: true },
  { name: 'confirmPassword', label: 'Confirm Password', type: 'password', icon: true },
  // { name: 'city', label: 'Which city to you live?', type: 'text' },
  // { name: 'tel', label: 'Phone Number', type: 'number' }
]

const genderOptions = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' }
]

const timestamp = new Date()

const Register = () => {
  const history = useHistory()
  const [state, setState] = useState({})
  const [fieldState, setFieldState] = useState(fields)
  const [errMsg, setErrMsg] = useState(null) 
  // let err = 'null'
  let randomPic = () => {
    return 'https://avatars.dicebear.com/v2/human/' + Math.floor(Math.random() * 100) + '.svg'
  }

  const [visible, setVisible] = useState("password")
  const [eyeIcon, setEyeIcon] = useState("eye slash")

  const switchEyeIcon = () => {
    if (visible === "password") {
      setVisible('text')
      setEyeIcon('eye')
    }
    else {
      setVisible('password')
      setEyeIcon('eye slash')
    }
  }

  const handleChange = (e, { name, value }) => {
    setState({ ...state, [name]: value, registerDate: timestamp })
  }

  const handleSubmit = () => {

    setState({ ...state, registerDate: timestamp })
    let validate = registerValidation(state, fields, setFieldState)
    if (validate) {
      // alert("User registered \n" + JSON.stringify(state))
      auth.createUserWithEmailAndPassword(state.email, state.password)
        .then(() => {
          console.log('logging in... wait')
          auth.signInWithEmailAndPassword(state.email, state.password)
            .then(function (result) {
              history.push('/posts')
            })
            .catch(function (error) {
              var errorCode = error.code;
              var errorMessage = error.message;
              console.log(errorCode)
              console.log(errorMessage)
              setErrMsg(errorMessage)
            });
        })
        .catch(function (error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode)
          console.log(errorMessage)
          setErrMsg(errorMessage)
        });
    }
  }

  return (
    <Segment basic style={{height: '90vh'}}>
    <Grid textAlign='center' style={{ height: 'calc(100vh - 6rem)' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 400, padding: 0 }}>
      <Header as='h2' color='grey' textAlign='center'>
        Register
      </Header>
      {/* <p style={{ fontSize: 9 }}>{JSON.stringify(state)}</p> */}
      {/* <p style={{ fontSize: 20 }}>{JSON.stringify(fields[4])}</p> */}

      <Form onSubmit={handleSubmit}>
        <Segment textAlign='left'>
          {fieldState.map((field) => {
            return (
              <>
                <Form.Input fluid
                  required
                  label={field.label}
                  placeholder={field.label}
                  name={field.name}
                  onChange={handleChange}
                  value={state[field.name]}
                  error={field.error}
                  type={field.type === 'password' ? visible : field.type}
                  icon={field.icon ?
                    <Icon name={eyeIcon} link
                      onClick={() => switchEyeIcon()} /> : false}
                />
              </>
            )
          })}
          <Button fluid size='small' color="teal">
            Sign up
          </Button>
        </Segment>
      </Form>
      {errMsg ? <Message attached='bottom' warning>
        <Icon name='warning circle' />
        {errMsg}
      </Message> : null }
      </Grid.Column>
    </Grid>
    </Segment>
  )
}

export default Register