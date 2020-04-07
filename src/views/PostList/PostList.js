import React, { useState } from 'react'
import { Map, PostCard } from '../../components'
import PostDetail from '../PostDetail'
import { PostsContext } from '../../context/PostsContext'
import { UserContext } from '../../context/UserContext'
import {
  Link,
  Route,
  Switch,
  useRouteMatch,
  useHistory,
  Redirect
} from "react-router-dom"

import {
  Container,
  Grid,
  Header,
  Segment,
  Responsive,
  Button
} from 'semantic-ui-react'

import styles from './styles'

const PostList = () => {
  const history = useHistory()
  let { path, url } = useRouteMatch();
  const { posts } = React.useContext(PostsContext)
  const { user } = React.useContext(UserContext)
  const [post, setPost] = useState()

  const PostCardContainer = ({ item }) => {
    return (
      <Segment raised fluid="true" onClick={() => {
        setPost(item)
        history.push(url + "/" + item.id + '/' + item.title.split(' ').join('-'))
      }}>
        <PostCard key={item.id} item={item} style={styles.postCard} user={user}/>
      </Segment>
    )
  }

  return (
    <div style={styles.container}>

      {/************ layout for Large screen ************/}
      <Responsive minWidth={800}>
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column width={7}>
              <div style={styles.posts}>
              {posts ? posts.map((item) => {
                return (
                  <PostCardContainer item={item} />
                )
              }) : null}
              </div>
            </Grid.Column>

            <Grid.Column width={9}>
              <Switch>
                {/* parent path: eg. posts/ */}
                <Route exact path={path}>
                  <Map />
                </Route>
                {/* switch to path params */}
                <Route path={`${path}/:id`}>
                  <PostDetail post={post} />
                </Route>
                <Redirect from={`${path}//*`} to={`${path}/*`} />
              </Switch>
            </Grid.Column>

          </Grid.Row>
        </Grid>
      </Responsive>

      {/************ layout for small screen ************/}
      <Responsive maxWidth={799}>
        <Switch>
          {/* parent path: eg. posts/ */}
          <Route exact path={path}>
            <Grid columns={2} stackable >
              {posts.map((item, i) => {
                return (
                  <Grid.Column key={i}>
                    <PostCardContainer item={item} />
                  </Grid.Column>
                )
              })}
            </Grid>
          </Route>
          {/* switch to path params */}
          <Route path={`${path}/:id`}>
            <PostDetail post={post} />
          </Route>
          <Redirect from={`${path}//*`} to={`${path}/*`} />

        </Switch>
      </Responsive>
    </div>
  )
}

export default PostList