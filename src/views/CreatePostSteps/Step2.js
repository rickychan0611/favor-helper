import React, { useContext } from 'react'
import { Icon, Button } from 'semantic-ui-react';
import { useHistory, useParams } from "react-router-dom";
import { PostsContext } from '../../context/PostsContext'
import { UserContext } from '../../context/UserContext'
import { FavButton } from '../../components';
import { PhotoSlider } from '../../components'
import Step1 from './Step1'
import Step3 from './Step3'

const Step2 = ({ Steps, setSteps }) => {
  const { preview, setPreview, formState, setFormState, validationError, setValidationError, success, setSuccess, posts } = useContext(PostsContext)
  const handleChange = (e, { name, value }) => {
    setFormState({ ...formState, [name]: value })
  }
  const history = useHistory()

  return (
    <>
      <h2>Step 2 of 5: <br />Upload pictures</h2><p> Please upload at least 1 picture. <br/>Press + to add. Press x to delete.</p>
      <PhotoSlider formState={formState} setFormState={setFormState} createPost={true} />
      <br/><br/>
      <p>The 1st picture from the left is the default picture.</p>

      <br />
      <div style={{
        position: 'absolute',
        top: 'auto',
        bottom: 50,
        left: 'auto',
        right: 45
      }}>

        <Button style={{ backgroundColor: "#bcbbbd", color: "white" }}
          onClick={() => { history.goBack() }} icon>
          <Icon name='close' />
        </Button>
        <FavButton clicked={() => { setSteps({ Step: Step1 }) }}> <Icon name='arrow left' />Back</FavButton>
        <FavButton clicked={() => {
          if ( formState.images == '') {
            alert("Please upload at least one picture.")
          }
          else {
          setSteps({ Step: Step3 })
          }
        }}> Next<Icon name='arrow right' /></FavButton>

      </div>
    </>
  )
}

export default Step2