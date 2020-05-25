import React, { useContext, useState } from 'react'
import styles from './styles'
import { Input, Form, Icon, Header, Checkbox, Dimmer, Container, Responsive, Button } from 'semantic-ui-react';
import firebase from 'firebase'
import { useHistory, useParams } from "react-router-dom";
import { PostsContext } from '../../context/PostsContext'
import { UserContext } from '../../context/UserContext'
import { FavButton, Map } from '../../components';
import { PhotoSlider } from '../../components'
import Step3 from './Step3'

const Step4 = ({ Steps, setSteps }) => {
  const { preview, setPreview, formState, setFormState, validationError, setValidationError, success, setSuccess, posts } = useContext(PostsContext)

  const handleChange = (e, { name, value }) => {
    setFormState({ ...formState, [name]: value })
  }
  const history = useHistory()

  const pickUpToggle = () => {
    setFormState(({ ...formState, pickUp: !formState.pickUp }))
  }

  const deliveryToggle = () => {
    setFormState(({ ...formState, delivery: !formState.delivery }))
  }

  const [deliveryForm, setDeliveryForm] = useState({})

  const handleDeliveryForm = (e, { value, name }) => {
    setDeliveryForm({ ...deliveryForm, [name]: value })
  }

  const clearField = (name) => {
    setDeliveryForm({ [name]: '' })
  }
  return (
    <>
      <h2>Step 4: <br />Set Available Date</h2>
      
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
        <FavButton clicked={() => { setSteps({ Step: Step3 }) }}> <Icon name='arrow left' />Back</FavButton>
        <FavButton clicked={() => { setSteps({ Step: Step3 }) }}> Next<Icon name='arrow right' /></FavButton>
      </div>
    </>
  )
}

export default Step4