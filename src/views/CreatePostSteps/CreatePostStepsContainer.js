import React, { useContext, useState } from 'react'
import styles from './styles'
import { Input, Form, Icon, Header, Grid, Dimmer, Container, Responsive, Button } from 'semantic-ui-react';
import firebase from 'firebase'
import { useHistory, useParams } from "react-router-dom";
import { PostsContext } from '../../context/PostsContext'
import { UserContext } from '../../context/UserContext'
import { FavButton } from '../../components';
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import Step4 from './Step4'


const CreatePostStepsContainer = () => {
  const { preview, setPreview, formState, setFormState, validationError, setValidationError, success, setSuccess, posts } = useContext(PostsContext)
  const handleChange = (e, { name, value }) => {
    setFormState({ ...formState, [name]: value })
  }
  const history = useHistory()

  const [Steps, setSteps]= useState({Step: Step1})

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
          <h1 style={{ color: 'white', margin: '0 auto', fontWeight: "bold" }}>CREATE A MEAL</h1><br></br>
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
              padding: 50,
              paddingBottom: 150,
            }}>
            <Steps.Step setSteps={setSteps}/>
        </div>
      </div>
      </div>
      {/* </Responsive> */}
    </>
  )
}

export default CreatePostStepsContainer