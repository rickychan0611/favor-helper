import React, { useContext } from 'react'
import styles from './styles'
import { Input, Form, Icon, Header, Grid, Dimmer, Container, Responsive, Button } from 'semantic-ui-react';
import firebase from 'firebase'
import { useHistory, useParams } from "react-router-dom";
import { PostsContext } from '../../context/PostsContext'
import { UserContext } from '../../context/UserContext'
import { FavButton } from '../../components';
import { PhotoSlider } from '../../components'
import Step1 from './Step1'
import Step3 from './Step3'

const Step2 = ({Steps, setSteps}) => {
  const { preview, setPreview, formState, setFormState, validationError, setValidationError, success, setSuccess, posts } = useContext(PostsContext)
  const handleChange = (e, { name, value }) => {
    setFormState({ ...formState, [name]: value })
  }
  const history = useHistory()

  return (
    <>
      <h2>Step 2: <br />Upload pictures</h2>
      {/* <h3>What is the name of your meal?</h3> */}
      <PhotoSlider formState={formState} setFormState={setFormState} createPost={true}/>
      <br/>
      <div style={{
        position: 'absolute',
        top: 'auto',
        bottom: 50,
        left: 'auto',
        right: 45
      }}>

        <Button style={{ backgroundColor: "#bcbbbd", color: "white" }}
          onClick={() => { history.goBack() }}>
          <Icon name='close' />
        </Button>
        <FavButton clicked={() => { setSteps({Step: Step1}) }}> <Icon name='arrow left' />Back</FavButton>
        <FavButton clicked={() => { setSteps({Step: Step3}) }}> Next<Icon name='arrow right' /></FavButton>

      </div>
    </>
  )
}

export default Step2