import React, { useState, useContext, useEffect } from 'react'
import { Grid, Button, Form, Confirm, Header, Segment, Image, Loader, Dimmer, Container } from 'semantic-ui-react'
import db from '../../firestore'
import { useHistory } from "react-router-dom";
import { UserContext } from '../../context/UserContext'
import { PostsContext } from '../../context/PostsContext'
import { Map, PostCard, PostCardContainer } from '../../components'

import AvatarImageCropper from 'react-avatar-image-cropper';
import firebase from 'firebase'

import styles from './styles'

const Profile = () => {
  const [confirm, setConfirm] = useState(false)
  const { user, setUser, loading, updateProfilePic } = useContext(UserContext)
  const { posts } = useContext(PostsContext)
  const history = useHistory()
  const [avatar, setAvatar] = useState(false)
  const [confirmloading, setConfirmLoading] = useState(false)

  const handleChange = (e, { name, value }) => {
    setUser({ ...user, [name]: value })
  }

  const onSubmit = (open) => {
    console.log(open)
    setConfirm(open)
  }

  const saveToServer = () => {
    setConfirmLoading(true)
    // setUser({...formState, formState})
    console.log('user' + JSON.stringify(user))

    db.collection('users').doc(user.id).update(user)
      .then(() => {
        setConfirm(false)
        setConfirmLoading(false)
        console.log('user' + JSON.stringify(user))
      })
  }

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

  let filteredPosts = []
  if (posts && user) {
     filteredPosts = posts.filter(filterItems => filterItems.posterUid == user.id)
  }
  useEffect(() => {

  }, [])

  return (
    <div style={{ padding: 14 }}>
      {loading ? <h1>loading</h1> : null }
      <Confirm
        open={confirm}
        onCancel={() => setConfirm(false)}
        onConfirm={saveToServer}
        content='Saving your changes?'
      />
      {!loading && user ?
        <>
          <h1>Your Profile</h1>
          <Container>
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
                        <AvatarImageCropper apply={apply} maxsize={1024 * 1024 * 5} />
                      </div>
                    </Dimmer>
                    {/* // } */}

                  </div>
                </Grid.Column>
                <Grid.Column width={12}>
                  <Form>
                    <Form.Input fluid
                      label="Your Name"
                      name="displayName"
                      value={user.displayName}
                      onChange={handleChange}
                      placeholder='Enter your name' />
                    <Form.TextArea fluid label='Tell us about yourself' name="aboutMe"
                      style={{ minHeight: 100 }}
                      value={user.aboutMe}
                      onChange={handleChange}
                      placeholder='Tell us a bit about yourself so guest can get to know you' />
                    <Button type="submit" onClick={() => setConfirm(true)}>Save</Button>
                  </Form>
                </Grid.Column>
              </Grid>
            </Segment>
            <h1>Your Posts</h1>
            <Grid stackable doubling columns={3}>
              {filteredPosts ?
                filteredPosts.map((item) => {
                  return (
                    <>
                      <Grid.Column>
                        <PostCard item={item} edit />
                      </Grid.Column>
                    </>
                  )
                }) : null}
            </Grid>
          </Container>

        </>
        :
        <>
          <Dimmer active inverted>
            <Loader inverted content='Loading' />
          </Dimmer>
        </>
      }
    </div>
  )
}

export default Profile