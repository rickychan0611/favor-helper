import React, { useContext, useEffect } from 'react'
import styles from './styles'
import { Input, Form, Icon, Header, Grid, Dimmer, Container, Responsive, Button } from 'semantic-ui-react';
import firebase from 'firebase'
import { useHistory, useParams } from "react-router-dom";
import { PostsContext } from '../../context/PostsContext'
import { UserContext } from '../../context/UserContext'
import { FavButton } from '../../components';
import Step2 from './Step2'

const Step1 = ({ Steps, setSteps }) => {
  const history = useHistory()
  const { formState, setFormState, pickupWeeks, deliveryWeeks } = useContext(PostsContext)
  const handleChange = (e, { name, value }) => {
    localStorage.removeItem('newPost')
    setFormState({ ...formState, [name]: value }, callback()
    )
  }
  const callback = () => {
    localStorage.setItem("newPost", JSON.stringify(formState))
  }

  const handleSubmit = () => {
    localStorage.setItem("newPost", JSON.stringify(formState))
    setSteps({ Step: Step2 })
  }

  const clearField = (name) => {
    setFormState({ ...formState, [name]: '' })
  }

  useEffect(() => {
    // localStorage.removeItem('newPost')
    // localStorage.removeItem('Images')    
    let state = JSON.parse(localStorage.getItem("newPost"))
    let d = new Date()
    let startTime = d.setHours(8)
    startTime = d.setMinutes(0)
    let endTime = d.setHours(21)
    endTime = d.setMinutes(0)
    state = {
      ...state,
      pickupStartTime: startTime,
      pickupEndTime: endTime,
      deliveryStartTime: startTime,
      deliveryEndTime: endTime,
      pickupWeeks,
      deliveryWeeks
    }
    console.log(state)
    if (state && formState) {
      setFormState(state)
    }
  }, [])

  return (
    <>
      <h2>Step 1 of 5: Information</h2>
      {/* <h3>What is the name of your meal?</h3> */}
      <Form onSubmit={handleSubmit}>
        <Form.Input
          required
          fluid
          label="What is the name of your meal?"
          placeholder="What's cooking?"
          size="large"
          value={formState.title}
          name="title"
          onChange={handleChange}
          icon={<Icon name='close' link onClick={() => { clearField("title") }} />}
        />
        <Form.Input
          required
          fluid
          label="How much?"
          placeholder="Enter an amount"
          size="large"
          type='number'
          value={formState.price}
          name="price"
          onChange={handleChange}
          icon={<Icon name='close' link onClick={() => { clearField("price") }} />}
        />
        <Form.Input
          fluid
          label="How many orders will you do? (0 = unlimited)"
          placeholder="Enter 0 if no limit"
          size="large"
          type='number'
          value={formState.maxOrder}
          name="maxOrder"
          onChange={handleChange}
          icon={<Icon name='close' link onClick={() => { clearField("maxOrder") }} />}
        />
        <Form.TextArea fluid label="Description" name="summary"
          style={{ minHeight: 100 }}
          required
          value={formState.summary}
          name="summary"
          placeholder="What is your meal? Detailed descriptons get the most customers joinning up!"
          onChange={handleChange}
        />
        <button onClick={() => clearField("summary")}>clear</button>

        <div style={{
          position: 'relative',
          width: '100%'
        }}
        >
          <div style={{
            marginTop: 30,
            position: 'absolute',
            left: 'auto',
            right: 0
          }}>
            <Button style={{ backgroundColor: "#bcbbbd", color: "white" }}
              onClick={() => { history.goBack() }}>
              <Icon name='close' /> Cancel
        </Button>

            <FavButton
              // disable={!formState.delivery && !formState.pickUp ? true : false}
              content="Submit"
              clicked={() => {
              }}> Next<Icon name='arrow right' />
            </FavButton>

          </div>
        </div>
      </Form>

    </>
  )
}

export default Step1