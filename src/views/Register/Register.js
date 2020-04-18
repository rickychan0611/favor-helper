import React, { useState, useContext } from 'react'
import { useHistory, Link } from "react-router-dom";
import { Button, Form, Grid, Header, Image, Message, Segment, Icon, Container } from 'semantic-ui-react'
import validatePassword from '../../functions/validatePassword'
import { auth } from '../../firestore'
import registerValidation from '../../functions/registerValidation'
import styles from './styles'
import { UserContext } from '../../context/UserContext'
import db from '../../firestore'
import noAvatar from '../../assets/images/no-avatar.png'

const fields = [
  { name: 'first_name', label: 'First Name', type: 'text' },
  { name: 'last_name', label: 'Last Name', type: 'text' },
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


const Register = () => {
  const history = useHistory()
  const [state, setState] = useState({})
  const [fieldState, setFieldState] = useState(fields)
  const [errMsg, setErrMsg] = useState(null)
  const { setDisplayName } = useContext(UserContext)

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
    const timestamp = new Date()

    setState({ ...state, [name]: value, registerDate: timestamp })
  }

  const handleSubmit = () => {
    const timestamp = new Date()

    let displayName = state.first_name + " " + state.last_name
    console.log('displayName displayName: ' + displayName)
    setState({ ...state, registerDate: timestamp })
    setDisplayName(displayName)
    let validate = registerValidation(state, fields, setFieldState)
    if (validate) {
      // alert("User registered \n" + JSON.stringify(state))
      auth.createUserWithEmailAndPassword(state.email, state.password)
        .then((doc) => {
          console.log('logging in... wait' + JSON.stringify(doc.user))

          db.collection('users').doc(doc.user.uid).set(
            {
              id: doc.user.uid,
              uid: doc.user.uid,
              displayName: displayName,
              photoURL: noAvatar,
              email: state.email,
              emailVerified: false
            }
          ).then(function (doc) {
            history.push('/posts')
            console.log("Document written with ID: ", doc.id);
          })
            .catch(function (error) {
              console.error("Error adding document: ", error);
            })
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
    <Segment basic style={{ height: '90vh' }}>
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
          </Message> : null}
        </Grid.Column>
      </Grid>
    </Segment>
  )
}

export default Register