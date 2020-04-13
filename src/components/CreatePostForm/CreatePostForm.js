import React, { useState, useContext, useEffect } from 'react'
import db from '../../firestore'
import { useHistory } from "react-router-dom";
import { PhotoSlider, Map, PreviewIcon } from '../../components'
import PriceTimeForm from './PriceTimeForm'

import { PostsContext } from '../../context/PostsContext'
import { UserContext } from '../../context/UserContext'

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
import './styles.css'


const CreatePostForm = () => {
  const [state, setState] = useState({
    title: '',
  })

  const { preview, setPreview } = useContext(PostsContext)
  const { user, setUser } = useContext(UserContext)

  
  const history = useHistory()
  
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
        createAt: timestamp,
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
  useEffect(() => {
    setPreview(false)
    if (!user) {
        history.push('/')
      return
    }
    if (user) {
      setState({...state, posterUid: user.uid})
    }
  }, [user])

  return (
    <>
      {user ?
      <>
      <PhotoSlider formState={state} setFormState={setState} />
      {/* <PickFile>Upload Image</PickFile> */}
      <Container>
        <br></br>
        <Grid column={2} stackable>
          <Grid.Column width={10} >

            {/* ------------------- Title ------------------*/}
            <Segment placeholder basic textAlign="center">

              {preview ?
                <h1 styles={styles.title}>{state.title}</h1>
                :
                <div>
                  <PreviewIcon preview={preview} />
                  <form>
                    <input type="text"
                      className="titleInput"
                      placeholder="Enter a title"
                      value={state.title}
                      style={{
                        width: "90%",
                        fontSize: 28,
                        fontFamily: "font-family: 'Nunito'",
                        fontWeight: 'bold',
                        textAlign: "center",
                        border: 'none',
                        borderBottom: '1px solid green',
                        marginBottom: 14
                      }}
                      onChange={(e) => { setState({ ...state, title: e.target.value }) }} />
                  </form>
                  {/* <div style={{ minWidth: 38, display: "inline-block" }}></div> */}
                </div>
              }

              <p style={{ fontSize: 20 }}>
                {state.address ? state.address[2].long_name : null }</p>
              <Segment basic><Rating defaultRating={4} maxRating={5} icon='star' disabled /> ({4})
                <br /><br />
                <img src={user.photoURL}
                  style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: '50%' }} />
                <br />
                {user.displayName}
              </Segment>
            </Segment>

            {/* ------------------- Details ------------------*/}
            <div style={{ textAlign: "left" }}>

              <Header>About this meal</Header></div>

            <Segment textAlign="left">
              <Form>
                <PreviewIcon preview={preview} />
                <Form.Input fluid label='What style are you doing?' name="dishStyle"
                  value={state.dishStyle} onChange={handleChange}
                  placeholder='Ex. Chinese, Japanese, Indian, Italian' />
                <PreviewIcon preview={preview} />
                <Form.TextArea fluid label="Summary" name="summary"
                  value={state.summary} onChange={handleChange}
                  placeholder="What's so good about your meal? Detailed descriptons get the most customers joinning up!" />
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
              <Grid column={2} stackable>
                <Grid.Column width={3}>
                  <div style={{ textAlign: 'center', margin: "0 auto" }}>
                    <img src={user.photoURL}
                      style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: '50%' }} />
                    <div style={{ textAlign: 'center', margin: "0 auto" }}>
                      <Button size="tiny">Change</Button>
                    </div>
                  </div>
                </Grid.Column>
                <Grid.Column width={13}>
                  <Form>
                  <PreviewIcon preview={preview} />
                    <Form.TextArea fluid label='Tell us about yourself' name="aboutMe"
                      style={{ minHeight: 100 }}
                      value={state.aboutMe} onChange={handleChange}
                      placeholder='Tell us a bit about yourself so guest can get to know you' />
                  </Form>
                </Grid.Column>
              </Grid>
            </Segment>
            {/* ------------------- Loaction map------------------*/}
            <Header style={{ margin: 0, textAlign: "left" }}>Your Location</Header>
            <p style={{ fontSize: 12, marginTop: 0, textAlign: "left" }}>
            Enter your address or pick up location to find customers that close to you.</p>
            <PreviewIcon preview={preview} />
            <Map height={300} formState={state} setFormState={setState}/>

          </Grid.Column>

          {/* ------------------- Price visable on large screen only------------------*/}
          <Grid.Column width={6}>
            <Responsive minWidth={766}>
              <PriceTimeForm
                preview={preview}
                state={state}
                setState={setState}
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
      : null}
    </>
  )
}

export default CreatePostForm