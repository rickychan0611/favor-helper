import React, { useState, useContext, useEffect } from 'react'
import db from '../../firestore'
import posts from '../../data/posts.json'
import { useHistory } from "react-router-dom";
import { firebase } from '@firebase/app';
import { PhotoSlider, Map } from '../../components'
import PriceTimeForm from './PriceTimeForm'
import {
  Container,
  Grid,
  Button,
  Form,
  Header,
  Segment,
  Input,
  Rating,
  Image,
  Divider,
  Icon,
  Checkbox,
  Responsive
} from 'semantic-ui-react'

import styles from './styles'

import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import { MapContext } from '../../context/MapContext'
import getLatLng from "../../functions/getLatLng"

const CreatePostForm = () => {
  const history = useHistory()
  const [state, setState] = useState({})

  let randomPic = () => {
    return 'https://avatars.dicebear.com/v2/human/' + Math.floor(Math.random() * 100) + '.svg'
  }

  const handleChange = (e, { name, value }) => {
    setState({ ...state, [name]: value })
    console.log(state)
  }

  const pickUpToggle = () => {
    setState(({ ...state, pickUp: !state.pickUp }))
  }

  const deliveryToggle = () => {
    setState(({ ...state, delivery: !state.delivery }))
  }

  const handleSubmit = () => {
    setState({ ...state, submitted: true })

    const timestamp = new Date()

    let newPost = db.collection("posts").doc()
    newPost.set(
      {
        ...state,
        id: newPost.id,
        authorPic: randomPic(),
        createAt: timestamp
      }
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
    <>
      <PhotoSlider />

      <Container>
        <br></br>
        <Grid column={2} stackable>
          <Grid.Column width={10} >
            {/* ------------------- Header ------------------*/}
            <Segment placeholder basic textAlign="center">
              <Header as='h1'>Crockpot Chicken Spaghetti</Header>
              <p style={{ fontSize: 20 }}>Richmond, BC &nbsp;</p>
              <Segment basic><Rating defaultRating={4} maxRating={5} icon='star' disabled /> ({4})
                <br /><br />
                <img src="https://lh3.googleusercontent.com/proxy/rkyHWguyOFRCn-6n3JYeG12I0Caxseoo0BcjnQCk-jWt4qpyCL0XwQgkuL8pk6JdSOs--FfYnW5K0NwI4aOheYEbgqeEM-wqiVLhIgw3qnima1q0ZrB4ZCm3ns829fqTD3LTKUpeCUyjymK8vu0tBrOBSOjb-FhKn9qwHHZ76RUitPwoLN8"
                  style={{ width: 70, height: 70, objectFit: 'cover', borderRadius: '50%' }} />
                <br />
                André Natera
              </Segment>
            </Segment>

            {/* ------------------- Details ------------------*/}
            <div style={{ textAlign: "left" }}><Header>About this meal</Header></div>
            <Segment textAlign="left">
              <Form>
                <Form.Input fluid label='What style are you doing?' name="dishStyle"
                  value={state.title} onChange={handleChange}
                  placeholder='Ex. Chinese, Japanese, Indian, Italian' />
                <Form.TextArea fluid label='What so good about your meal?' name="Summary"
                  value={state.title} onChange={handleChange}
                  placeholder='Tell your customers what you are making. Detailed descriptons get the most customers joinning up!' />
              </Form>
            </Segment>
            {/* ------------------- Price visable on small screen only------------------*/}
            <Responsive maxWidth={765}>
              <PriceTimeForm
                state={state}
                handleChange={handleChange}
                pickUpToggle={pickUpToggle}
                deliveryToggle={deliveryToggle}
              />
              {JSON.stringify(state)}
            </Responsive>
            {/* ------------------- About Me------------------*/}
            <br />
            <Header style={{ margin: 0, textAlign: "left" }}>About you</Header>
            <p style={{ fontSize: 12, marginTop: 0, textAlign: "left" }}>
              Smile! A great picture of your face helps customer get to know you a bit better</p>
            <Segment>
              <Grid column={2}>
                <Grid.Column width={3}>
                  <Segment basic>
                    <img src="https://lh3.googleusercontent.com/proxy/rkyHWguyOFRCn-6n3JYeG12I0Caxseoo0BcjnQCk-jWt4qpyCL0XwQgkuL8pk6JdSOs--FfYnW5K0NwI4aOheYEbgqeEM-wqiVLhIgw3qnima1q0ZrB4ZCm3ns829fqTD3LTKUpeCUyjymK8vu0tBrOBSOjb-FhKn9qwHHZ76RUitPwoLN8"
                      style={{ width: 70, height: 70, objectFit: 'cover', borderRadius: '50%' }} />
                    <Button size="tiny">Change</Button>
                  </Segment>
                </Grid.Column>
                <Grid.Column width={13}>
                  <Form>
                    <Form.TextArea fluid label='Tell us about yourself' name="aboutMe"
                      style={{ minHeight: 100 }}
                      value={state.title} onChange={handleChange}
                      placeholder='Tell us a bit about yourself so guest can get to know you' />
                  </Form>
                </Grid.Column>
              </Grid>
            </Segment>
            {/* ------------------- Loaction map------------------*/}
            <Header>Your Location</Header>
            <Map height={300}/>

          </Grid.Column>

          {/* ------------------- Price visable on large screen only------------------*/}
          <Grid.Column width={6}>
            <Responsive minWidth={766}>
              <PriceTimeForm
                state={state}
                handleChange={handleChange}
                pickUpToggle={pickUpToggle}
                deliveryToggle={deliveryToggle}
              />
              {JSON.stringify(state)}
            </Responsive>
          </Grid.Column>
        </Grid>


      </Container>
    </>
  )
}

export default CreatePostForm