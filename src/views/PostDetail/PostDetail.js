import React, { useState, useEffect } from 'react'
import db from '../../firestore'
import styles from './styles'
import {
  useParams, useRouteMatch, useHistory
} from "react-router-dom";

import {
  Container,
  Button,
  Dimmer,
  Loader,
  Segment
} from 'semantic-ui-react'

const PostDetail = () => {
  let { id } = useParams();
  let history = useHistory()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)


  const postQuery = (id) => {
    return(
    db.collection('posts').where('id', '==', id)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log('No matching documents.');
          setLoading(false)
          setError(true)
        }  
        snapshot.forEach(doc => {
          setPost(doc.data())
          setLoading(false)
          setError(false)
        });
      })
      .catch(err => {
        console.log('Error getting documents', err);
        setLoading(false)
        setError(true)
      })
      )
  }

const Post = ({ post }) => {
  return (
    <div>
      {loading ? 
      <Segment basic placeholder>
          <Dimmer active inverted>
            <Loader inverted>Loading</Loader>
          </Dimmer>
        </Segment>
        : null }
      {!error && post?
        <div>
          id:{post.id} <br />
          title: {post.title} <br />
          description: {post.des}<br />
          location: {post.location}<br />
          postDate: {post.postDate}<br />
          jobDate: {post.jobDate}<br />
          budget: {post.budget}<br />
          author id: {post.author}<br />
        </div> 
        : 
        !error? null : <h1>Post not found</h1>
        }
    </div>
  )
}

  useEffect(()=>{
    postQuery(id)
  },[id])

  return (
    <Container style={styles.container}>
      This is PostDetail page
      <Post post={post} />
      <Button onClick={() => history.push('/posts')}>Go back</Button>
    </Container>
  )
}

export default PostDetail