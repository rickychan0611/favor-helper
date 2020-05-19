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

const MyPosts = () => {
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
      {loading ? <h1>loading</h1> : null}
      <Confirm
        open={confirm}
        onCancel={() => setConfirm(false)}
        onConfirm={saveToServer}
        content='Saving your changes?'
      />
      {!loading && user ?
        <>
          <h1>Your Posts</h1>
          <Container>
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
          <Dimmer active inverted page>
            <Loader inverted content='Loading' />
          </Dimmer>
        </>
      }
    </div>
  )
}

export default MyPosts