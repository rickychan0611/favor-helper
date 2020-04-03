import React from 'react'
import { Map, PostCard } from '../../components'
import PostDetail from '../PostDetail'
import { PostsContext } from '../../context/PostsContext'
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

  return (
    <div>
      <Container style={styles.container}>
        <Header as='h1'>Posts</Header>
        <Button onClick={()=>{history.push('/create-post')}}>Create a post</Button>
        {/* display map for large screen only */}
        <Responsive minWidth={998}>
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column>
                <Segment basic style={styles.posts}>
                  {posts ? posts.map((item) => {
                    return (
                      <Link to={url + "/" + item.id + '/' + item.title.split(' ').join('-')}>
                        <PostCard key={item.id} item={item}
                        />
                      </Link>
                    )
                  }) : null}
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
                  <Redirect from={`${path}//*`} to={`${path}/*`} />
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