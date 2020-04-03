import React, { useState } from 'react'
import { Map, PostCard } from '../../components'
import PostDetail from '../PostDetail'
import posts from '../../data/posts.json'
import {
  Link,
  Route,
  Switch,
  useRouteMatch,
} from "react-router-dom"

import {
  Container,
  Grid,
  Header,
  Segment,
  Responsive
} from 'semantic-ui-react'

import styles from './styles'

const PostList = () => {

  let { path, url } = useRouteMatch();

  return (
    <div>
      <Container style={styles.container}>
        <Header as='h1'>Posts</Header>

        {/* display map for large screen only */}
        <Responsive minWidth={998}>
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column>
                <Segment basic style={styles.posts}>
                  {posts.map((item) => {
                    return (
                      <Link to={url + "/" + item.id + '/' + item.title.split(' ').join('-')}>
                        <PostCard key={item.id} item={item}
                        />
                      </Link>
                    )
                  })}
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Switch>
                  {/* parent path: eg. posts/ */}
                  <Route exact path={path}>
                    <Map />
                  </Route>
                  {/* switch to path params */}
                  <Route path={`${path}/:id`}>
                    <PostDetail />
                  </Route>
                </Switch>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Responsive>

        {/* hide map for small screen */}
        <Responsive maxWidth={997}>
          <Grid columns={2} stackable>
            {posts.map((item, i) => {
              return (
                <Grid.Column key={i}>
                  <PostCard key={i} item={item} />
                </Grid.Column>
              )
            })}
          </Grid>
        </Responsive>
      </Container>
    </div>
  )
}

export default PostList