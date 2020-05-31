import React, { useContext, useState, useEffect } from 'react'
import styles from './styles'
import { Input, Form, Icon, Header, Grid, Dimmer, Container, Responsive, Button } from 'semantic-ui-react';
import firebase from 'firebase'
import { useHistory, useParams } from "react-router-dom";
import { PostsContext } from '../../context/PostsContext'
import { UserContext } from '../../context/UserContext'
import { ImageSliderContext } from '../../context/ImageSliderContext'
import { FavButton } from '../../components';
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import Step4 from './Step4'
import Step5 from './Step5'


const EditPostStepsContainer = () => {
  const { pickupWeeks, deliveryWeeks, formState, setFormState } = useContext(PostsContext)
  const { setImages } = useContext(ImageSliderContext)
  const handleChange = (e, { name, value }) => {
    setFormState({ ...formState, [name]: value })
  }
  const history = useHistory()

  const [Steps, setSteps]= useState({Step: Step1})

  useEffect(() => {
    // localStorage.removeItem('editPost')
    // localStorage.removeItem('Images') 
    setImages(formState.images)
    let state = formState
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
      {/* <Responsive minWidth={400}> */}
      <div style={{
        position: "fixed",
        zIndex: 0,
        width: '100vw',
        height: "45vh",
        backgroundImage: 'linear-gradient(to top right, #9991c9, #e5c1cd)'
      }}>
        <div style={{
          position: "relative",
          zIndex: 1,
          marginTop: 30,
          display: 'flex',
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}>
          <h1 style={{ color: 'white', margin: '0 auto', fontWeight: "bold" }}>
            EDIT YOUR MEAL</h1><br></br>
          <div
            style={{
              position: "relative",
              textAlign: "left",
              // height: '70vh',
              width: '92vw',
              maxWidth: 500,
              backgroundColor: 'white',
              boxShadow: '0px 0px 20px grey',
              borderRadius: 7,
              padding: 30,
              paddingBottom: 130,
              marginBottom: 30
            }}>
            <Steps.Step setSteps={setSteps} edit={true}/>
        </div>
      </div>
      </div>
      {/* </Responsive> */}
    </>
  )
}

export default EditPostStepsContainer