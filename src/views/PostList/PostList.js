import React, { useState } from 'react'
import { Map, PostCard, PostCardContainer } from '../../components'
import PostDetail from '../PostDetail'
import { PostsContext } from '../../context/PostsContext'
import { UserContext } from '../../context/UserContext'
import {  useRouteMatch, useHistory } from "react-router-dom"

import { Container, Grid } from 'semantic-ui-react'

import styles from './styles'

const PostList = () => {
  const history = useHistory()
  let { path, url } = useRouteMatch();
  const { posts } = React.useContext(PostsContext)
  const { user } = React.useContext(UserContext)
  const [post, setPost] = useState()

  return (
    <div style={styles.container}>
      <Container>
      <Grid stackable doubling columns={3}>
        {posts ? posts.map((item) => {
          return (
            <>
            <Grid.Column>
              <PostCardContainer item={item} />
            </Grid.Column>
            </>
          )
        }) : null}
      </Grid>
      </Container>
    </div>
  )
}

export default PostList