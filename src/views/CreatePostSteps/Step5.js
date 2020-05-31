import React, { useContext, useState, useEffect } from 'react'
import {
  Grid,
  Button,
  Form,
  Icon,
  Dimmer,
} from 'semantic-ui-react'
import firebase from 'firebase'
import { useHistory } from "react-router-dom";
import { PostsContext } from '../../context/PostsContext'
import { UserContext } from '../../context/UserContext'
import Step4 from './Step4'
import './styles.css'
import AvatarImageCropper from 'react-avatar-image-cropper';
import { FavButton } from '../../components'
import db from '../../firestore'

const Step5 = ({ Steps, setSteps }) => {

  const uploadToServer = (file) => {
    firebase.storage().ref('userPic/' + user.id).put(file)
      .then((fileData) => { // then get downloadUrl
        let storage = firebase.storage()
        let urlRef = storage.ref('userPic/' + user.id)
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
  const apply = (file) => {
    // handle the blob file you want
    // such as get the image src
    setAvatar(false)
    // uploadToServer(window.URL.createObjectURL(file))
    uploadToServer(file)
    // return imgSrc
  }
  const [avatar, setAvatar] = useState(false)

  const { formState, setFormState, submitPostToServer, loading, setLoading } = useContext(PostsContext)
  const { user, updateProfilePic } = useContext(UserContext)

  const handleChange = (e, { name, value }) => {
    setFormState({ ...formState, [name]: value })
  }
  const history = useHistory()

  const submit = () => {
    db.collection('users').doc(user.id).update(
      { aboutMe: formState.aboutMe }
    )
    submitPostToServer()
  }

  useEffect(() => {
    if (user) {
      if (user.aboutMe) {
        setFormState({ ...formState, aboutMe: user.aboutMe })
      }
    }
  }, [user])

  return (
    <>
      <h2>Step 5 of 5: About yourself</h2>
      <Grid column={1} stackable>
        <Grid.Column width={4}>
          <div style={{ textAlign: 'center', margin: "0 auto" }}>

            {/* {!avatar ? */}
            <>
              {user == "not signed in" ? null :
                <img src={user.photoURL}
                  style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: '50%' }} />
              }

              <div style={{ textAlign: 'center', margin: "0 auto" }}>
                <Button size="tiny" onClick={() => { setAvatar(true) }}>Change</Button>
              </div>
            </>
            {/* // : */}
            <Dimmer active={avatar} onClickOutside={() => { setAvatar(false) }} page>
              <div style={{ width: '250px', height: '250px', backgroundColor: 'white', margin: 'auto', border: '1px solid black', zIndex: 1000 }}>
                <AvatarImageCropper apply={apply} maxsize={1024 * 1024 * 5} />
              </div>
            </Dimmer>
            {/* // } */}

          </div>
        </Grid.Column>
        <Grid.Column width={12}>
          <Form>
            <Form.TextArea fluid label='Tell us about yourself' name="aboutMe"
              style={{ minHeight: 100 }}
              value={formState.aboutMe} onChange={handleChange}
              placeholder='Tell us a bit about yourself so guest can get to know you' />
          </Form>
        </Grid.Column>
      </Grid>

      <div style={{
        position: 'absolute',
        top: 'auto',
        bottom: 60,
        left: 'auto',
        right: 45
      }}>

        <Button style={{ backgroundColor: "#bcbbbd", color: "white" }}
          onClick={() => { 
            history.goBack() 
            setFormState({})
          }} icon>
          <Icon name='close' />
        </Button>
        <FavButton clicked={() => { setSteps({ Step: Step4 }) }}> <Icon name='arrow left' />Back</FavButton>
        {!loading ?
          <FavButton clicked={() => {
            setSteps({ Step: Step5 })
            submit()
          }}> <Icon name='check' /> Publish now
          </FavButton>
          :
          <FavButton>
            <Icon loading name='spinner' color="white" />
          </FavButton>
        }
      </div>
    </>
  )
}

export default Step5