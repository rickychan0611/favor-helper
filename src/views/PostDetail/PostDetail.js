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

const PostDetail = (props) => {
  let { id } = useParams();
  let history = useHistory()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)


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
          });
        })
        .catch(err => {
          console.log('Error getting documents', err);
          setLoading(false)
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
          :
          post ?
            <div>
              id:{post.id} <br />
              title: {post.title} <br />
              description: {post.desc}<br />
              location: {post.location}<br />
              postDate: {post.postDate}<br />
              jobDate: {post.jobDate}<br />
              budget: {post.budget}<br />
              author id: {post.author}<br />
            </div>
            :
            <h1>Page not found</h1>
        }
      </div>
    )
  }

  useEffect(() => {
    if (!props.post) {
      postQuery(id)
    }
    if (props.post) {
      setLoading(false)
    }
  }, [id])

  return (
    <Container style={styles.container}>
      page id: {id}
      {props.post ?
        <div> fetch from local
      <Post post={props.post} />
        </div>
        :
        <div> fetch from server
      <Post post={post} />
        </div>
      }
      <Button onClick={() => history.push('/posts')}>Go back</Button>
    </Container>
  )
}

export default PostDetail