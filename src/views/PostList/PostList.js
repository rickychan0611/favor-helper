import React, { useState } from 'react'
import { Map, PostDetail, PostCard } from '../../components'
import posts from '../../data/posts.json'
import {
  Container,
  Grid,
  Header,
  Segment,
  Responsive
} from 'semantic-ui-react'

import styles from './styles'

const PostList = () => {
  const [showMap, setShowMap] = useState(true)
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
                      <PostCard key={item.id} item={item} />
                    )
                  })}
                </Segment>
              </Grid.Column>
              <Grid.Column>
                {showMap ? <Map /> : <PostDetail />}
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