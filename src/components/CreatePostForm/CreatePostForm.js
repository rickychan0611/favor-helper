import React, { useState, useContext, useEffect } from 'react'
import db from '../../firestore'
import { useHistory } from "react-router-dom";
import { PhotoSlider, Map, PreviewIcon, PickFile } from '../../components'
import PriceTimeForm from './PriceTimeForm'
import { PostsContext } from '../../context/PostsContext'
import { UserContext } from '../../context/UserContext'
import AvatarImageCropper from 'react-avatar-image-cropper';
import firebase from 'firebase'

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
  Modal,
  Icon,
  Dimmer,
  Responsive
} from 'semantic-ui-react'

import styles from './styles'
import './styles.css'


const CreatePostForm = () => {
  const [openBottomBar, setOpenBottomBar] = useState(false)

  const { preview, setPreview, formState, setFormState, validationError, setValidationError, success, setSuccess } = useContext(PostsContext)
  const { user, updateProfilePic } = useContext(UserContext)

  const history = useHistory()

  let randomPic = () => {
    return 'https://avatars.dicebear.com/v2/human/' + Math.floor(Math.random() * 100) + '.svg'
  }

  const handleChange = (e, { name, value }) => {
    setFormState({ ...formState, [name]: value })
    console.log(formState)
  }

  const pickUpToggle = () => {
    setFormState(({ ...formState, pickUp: !formState.pickUp }))
  }

  const deliveryToggle = () => {
    setFormState(({ ...formState, delivery: !formState.delivery }))
  }

  const handleSubmit = () => {
    setFormState({ ...formState, submitted: true })

    const timestamp = new Date()

    let newPost = db.collection("posts").doc()
    newPost.set(
      {
        ...formState,
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
  const PriceTime = () => (
    <PriceTimeForm
      preview={preview}
      formState={formState}
      setFormState={setFormState}
      handleChange={handleChange}
      pickUpToggle={pickUpToggle}
      deliveryToggle={deliveryToggle}
    />
  )

  useEffect(() => {
    setPreview(false)
    if (!user) {
      history.push('/')
      return
    }
    if (user) {
      setFormState({ ...formState, posterUid: user.uid })
    }
  }, [user])

  useEffect(() => {
    setOpenBottomBar(true)
  }, [])

  useEffect(() => {
    if (validationError) {
      alert("Please fill out all the required fields: Title, price, pickup method and location")
      setValidationError(false)
    }
  }, [validationError])

  // useEffect(() => {
  //   if (success){
  //     alert("success")
  //     setSuccess(false)
  //   }
  // }, [success])

  const [avatar, setAvatar] = useState(false)

  const apply = (file) => {
    // handle the blob file you want
    // such as get the image src
    setAvatar(false)
    // uploadToServer(window.URL.createObjectURL(file))
    uploadToServer(file)
    // return imgSrc
  }

  //****upload the file to firebase
  const uploadToServer = (file) => {
    firebase.storage().ref('userProfile/' + user.id).put(file)
      .then((fileData) => { // then get downloadUrl
        let storage = firebase.storage()
        let urlRef = storage.ref('userProfile/' + user.id)
        urlRef.getDownloadURL().then(function (downloadURL) {
          // item.refundImg = downloadURL
          return downloadURL
        })
          .then((downloadURL) => {
            updateProfilePic(downloadURL)
            return
          })
      });
  }
  return (
    <>
      <Modal
        open={success}
        size='small'
        dimmer='blurring'
      >
        <Header icon='checkmark' content='Your post has been published!' />
        <Modal.Content>
          <h3>You can manage your posts in your profile page.</h3>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' onClick={() => { history.push('/posts') }}>
            <Icon name='checkmark' /> OK
          </Button>
        </Modal.Actions>
      </Modal>

      {user ?
        <>
          {console.log(JSON.stringify(formState))}
          <PhotoSlider formState={formState} setFormState={setFormState} />
          {/* <PickFile>Upload Image</PickFile> */}
          <Container>
            <br></br>
            <Grid column={2} stackable>
              <Grid.Column width={10} >

                {/* ------------------- Title ------------------*/}
                <Segment placeholder basic textAlign="center">

                  {preview ?
                    <h1 styles={styles.title}>{formState.title}</h1>
                    :
                    <div>
                      <PreviewIcon preview={preview} required={true} />
                      <form>
                        <input type="text"
                          className="titleInput"
                          placeholder="What's cooking?"
                          value={formState.title}
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
                          onChange={(e) => { setFormState({ ...formState, title: e.target.value }) }} />
                      </form>
                      {/* <div style={{ minWidth: 38, display: "inline-block" }}></div> */}
                    </div>
                  }

                  <p style={{ fontSize: 20 }}>
                    {formState.address ? formState.address[2].long_name : null}</p>
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
                      value={formState.dishStyle} onChange={handleChange}
                      placeholder='Ex. Chinese, Japanese, Indian, Italian' />
                    <PreviewIcon preview={preview} />
                    <Form.TextArea fluid label="Summary" name="summary"
                      value={formState.summary} onChange={handleChange}
                      placeholder="What's so good about your meal? Detailed descriptons get the most customers joinning up!" />
                  </Form>
                </Segment>


                {/* ------------------- Price visable on small screen only------------------*/}
                <Responsive maxWidth={765}>
                  <PriceTimeForm
                    preview={preview}
                    formState={formState}
                    setFormState={setFormState}
                    handleChange={handleChange}
                    pickUpToggle={pickUpToggle}
                    deliveryToggle={deliveryToggle}
                  />
                </Responsive>


                {/* ------------------- About Me------------------*/}
                <br />
                <Header style={{ margin: 0, textAlign: "left" }}>About you</Header>
                <p style={{ fontSize: 12, marginTop: 0, textAlign: "left" }}>
                  Smile! A great picture of your face helps customer get to know you a bit better</p>
                <Segment>
                  <Grid column={2} stackable>
                    <Grid.Column width={4}>
                      <div style={{ textAlign: 'center', margin: "0 auto" }}>

                        {/* {!avatar ? */}
                        <>
                          <img src={user.photoURL}
                            style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: '50%' }} />


                          <div style={{ textAlign: 'center', margin: "0 auto" }}>
                            <Button size="tiny" onClick={() => { setAvatar(true) }}>Change</Button>
                          </div>
                        </>
                        {/* // : */}
                        <Dimmer active={avatar} onClickOutside={() => { setAvatar(false) }} page>
                          <div style={{ width: '250px', height: '250px', backgroundColor: 'white', margin: 'auto', border: '1px solid black', zIndex: 1000 }}>
                            <AvatarImageCropper apply={apply} />
                          </div>
                        </Dimmer>
                        {/* // } */}

                      </div>
                    </Grid.Column>
                    <Grid.Column width={12}>
                      <Form>
                        <PreviewIcon preview={preview} />
                        <Form.TextArea fluid label='Tell us about yourself' name="aboutMe"
                          style={{ minHeight: 100 }}
                          value={formState.aboutMe} onChange={handleChange}
                          placeholder='Tell us a bit about yourself so guest can get to know you' />
                      </Form>
                    </Grid.Column>
                  </Grid>
                </Segment>
                {/* ------------------- Loaction map------------------*/}

                <Header style={{ margin: 0, textAlign: "left" }}>Your Location</Header>
                <p style={{ fontSize: 12, marginTop: 0, textAlign: "left" }}>
                  Enter your address or pick up location to find customers that close to you.</p>
                <PreviewIcon preview={preview} required={true} />
                <Map height={300} formState={formState} setFormState={setFormState} />

              </Grid.Column>


              {/* ------------------- Price visable on large screen only------------------*/}
              <Grid.Column width={6}>
                <Responsive minWidth={766}>
                  <PriceTimeForm
                    preview={preview}
                    formState={formState}
                    setFormState={setFormState}
                    handleChange={handleChange}
                    pickUpToggle={pickUpToggle}
                    deliveryToggle={deliveryToggle}
                  />
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