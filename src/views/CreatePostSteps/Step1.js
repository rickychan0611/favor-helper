import React, { useContext } from 'react'
import styles from './styles'
import { Input, Form, Icon, Header, Grid, Dimmer, Container, Responsive, Button } from 'semantic-ui-react';
import firebase from 'firebase'
import { useHistory, useParams } from "react-router-dom";
import { PostsContext } from '../../context/PostsContext'
import { UserContext } from '../../context/UserContext'
import { FavButton } from '../../components';
import Step2 from './Step2'

const Step1 = ({Steps, setSteps}) => {

  const { preview, setPreview, formState, setFormState, validationError, setValidationError, success, setSuccess, posts } = useContext(PostsContext)
  const handleChange = (e, { name, value }) => {
    setFormState({ ...formState, [name]: value })
  }
  const history = useHistory()

  return (
    <>
      <h1>Step 1: Information</h1>
      {/* <h3>What is the name of your meal?</h3> */}
      <Form>
        <Form.Input
          fluid
          label="What is the name of your meal?"
          placeholder="What's cooking?"
          size="large"
          value={formState.title}
          onChange={(e) => { setFormState({ ...formState, title: e.target.value }) }}
        />
        <Form.Group widths='equal'>
          <Form.Input
            fluid
            label="How much?"
            placeholder="Enter an amount"
            size="large"
            type='number'
            value={formState.price}
            onChange={(e) => { setFormState({ ...formState, price: e.target.value }) }}
          />
          <Form.Input
            fluid
            label="How many orders will you do?"
            placeholder="Enter 0 if no limit"
            size="large"
            type='number'
            value={formState.maxOrder}
            onChange={(e) => { setFormState({ ...formState, maxOrder: e.target.value }) }}
          />
        </Form.Group>
        <Form.TextArea fluid label="Description" name="summary"
          value={formState.summary}
          placeholder="What's so good about your meal? Detailed descriptons get the most customers joinning up!"
          onChange={(e) => { setFormState({ ...formState, summary: e.target.value }) }}
        />
      </Form>

      <div style={{
        position: 'absolute',
        top: 'auto',
        bottom: 60,
        left: 'auto',
        right: 45
      }}>

        <Button style={{ backgroundColor: "#bcbbbd", color: "white" }}
          onClick={() => { history.goBack() }}>
          <Icon name='close' /> Cancel
        </Button>

        <FavButton clicked={() => { setSteps({Step: Step2}) }}> Next<Icon name='arrow right' /></FavButton>

      </div>
    </>
  )
}

export default Step1