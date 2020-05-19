import React, { useState, useEffect } from 'react'
import db from '../../firestore'
import { UserContext } from '../../context/UserContext'
import { PostsContext } from '../../context/PostsContext'
import { PhotoSlideInDetail, Post, QuestionForm } from '../../components'

import styles from './styles'
import {
  useParams, useHistory
} from "react-router-dom";

import {
  Container,
  Button,
  Divider,
  Dimmer,
  Loader
} from 'semantic-ui-react'

const PostDetail = (props) => {
  let { id } = useParams();
  let history = useHistory()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const { user } = React.useContext(UserContext)
  const { posts } = React.useContext(PostsContext)

  const postQuery = (id) => {
    return (
      db.collection('posts').where('id', '==', id)
        .get()
        .then(snapshot => {
          if (snapshot.empty) {
            console.log('No matching documents.');
            setLoading(false)
          }
          snapshot.forEach(doc => {
            setPost(doc.data())
            setLoading(false)
            getPoster(doc.data().posterUid)
          });
        })
        .catch(err => {
          console.log('Error getting documents', err);
          setLoading(false)
        })
    )
  }

  useEffect(() => {
    if (!post) {
      postQuery(id)
    }
    if (post) {
      setLoading(false)
    }
  }, [id])

  const [poster, setPoster] = useState({})
  
  const getPoster = (id) => {
    db.collection('users').where('uid', '==', id).get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          console.log(JSON.stringify(doc.data()))
          setPoster(doc.data())
        })
      }
      )
  }

  return (
    <>
      {post ? <PhotoSlideInDetail images={post.images} /> : null}

      <Container style={styles.container}>
        {post ?
          <>
            <div>
              <Post post={post} loading={loading} poster={poster} user={user}/>
            </div>
          </>
          :
          <>
          <Dimmer active inverted page>
            <Loader inverted content='Loading' />
          </Dimmer>
        </>
        }
       
        <br></br>
        <Divider />
        <Button onClick={() => history.push('/posts')}>Go back</Button>
      </Container>
    </>
  )
}

export default PostDetail