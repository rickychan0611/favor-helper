import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import { Button, Form, Grid, Header, Image, Message, Segment, Icon } from 'semantic-ui-react'
import validatePassword from '../../functions/validatePassword'
import styles from './styles'

const fields = [
  { name: 'first-name', label: 'First Name', type: 'text' },
  { name: 'last-name', label: 'Last Name', type: 'text' },
  { name: 'email', label: 'Email', type: 'text' },
  { name: 'password', label: 'Password (min. 6 characters and at least 1 uppercase and 1 digit)', type: 'password', icon: true },
  { name: 'confirmPassword', label: 'Confirm Password', type: 'password', icon: true },
  { name: 'city', label: 'Which city to you live?', type: 'text' },
  { name: 'tel', label: 'Phone Number', type: 'number' }
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

  let randomPic = () => {
    return 'https://avatars.dicebear.com/v2/human/' + Math.floor(Math.random() * 100) + '.svg'
  }

  const validation = () => {
    let emailOK, passwordOK, confirmPasswordOK = null
    
    // validateEmail ------------
    if (!validateEmail(state.email)) {
      console.log('email?? NO')
      fields[fields.findIndex(item => item.name === "email")].error = {
        content: 'Invalid email address',
        pointing: 'below',
      }
      setFieldState(fields)
    }
    // validatePassword ------------
    if (!validatePassword(state.password)) {
      fields[fields.findIndex(item => item.name === "password")].error = {
        content: 'Invalid password',
        pointing: 'below',
      }
      setFieldState(fields)
    }
    // Confirm Password ------------
    if (!comparePassword(state.password, state.confirmPassword)) {
      fields[fields.findIndex(item => item.name === "confirmPassword")].error = {
        content: 'Password does not match',
        pointing: 'below',
      }
      setFieldState(fields)
    }
  
    //hide error
    if (validateEmail(state.email))  {
      delete fields[fields.findIndex(item => item.name === "email")].error //del error 
      setFieldState(fields)
      emailOK = true
    }
    //hide error
    if (validatePassword(state.password)) {
      delete fields[fields.findIndex(item => item.name === "password")].error //del error 
      setFieldState(fields)
      passwordOK = true
    }
    //hide error
    if (comparePassword(state.password, state.confirmPassword)) {
      delete fields[fields.findIndex(item => item.name === "confirmPassword")].error //del error 
      confirmPasswordOK = true
      setFieldState(fields)
    }

    if (emailOK && passwordOK && confirmPasswordOK) return true
    else return false
  }

   const validateEmail = (email) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return (true)
      }
      return (false)
    }

    const comparePassword = (password, comparePassword) => {
      if ( password === comparePassword ) {
        return true
      }
      else return false
    }

  const [visible, setVisible] = useState("password")
  const [eyeIcon, setEyeIcon] = useState("eye slash")

  const handleVisible = () => {
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
    if (validation()){
      alert("Form is validated. Ready to submit: \n" + JSON.stringify(state))
    }
  }

  return (
    <Grid textAlign='center' style={{ height: 'calc(100vh - 11rem)' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 500, padding: 0 }}>
        <Header as='h2' color='grey' textAlign='left'>
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
                        onClick={() => handleVisible()} /> : false}
                  />
                </>
              )
            })}
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

export default Register