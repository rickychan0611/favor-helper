import React from 'react'
import { Map } from '../../components'
import styles from './styles'
import { useParams, useRouteMatch, useHistory 
} from "react-router-dom";
import posts from '../../data/posts.json'

import {
  Container,
  Button,
  Header,
  Segment,
  Responsive
} from 'semantic-ui-react'

const Post = ({id}) => {
  const post = posts.find(item => item.id == id)
  return (
    <div>
      id:{post.id} <br/>
      title: {post.title} <br/>
      description: {post.des}<br/>
      location: {post.location}<br/>
      postDate: {post.postDate}<br/>
      jobDate: {post.jobDate}<br/>
      budget: {post.budget}<br/>
      author id: {post.author}<br/>
    </div>
  )
}

const PostDetail = () => {
  let { id } = useParams();
  let { path, url } = useRouteMatch();
  let history = useHistory()

  return (
    <Container style={styles.container}>
    This is PostDetail page
    id: {id}
    <Post id={id}/>
    <Button onClick={() => history.push('/posts')}>Go back</Button>
    </Container>
  )
}

export default PostDetail