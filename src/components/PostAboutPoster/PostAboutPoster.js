import React, { Fragment } from 'react'
import { Segment, Header, Grid } from 'semantic-ui-react'
import styles from './styles'

const PostAboutPoster = ({ post, poster }) => {
  return (
    <Fragment>
      <Header>About {poster.displayName}</Header>
      {/* <p style={{ fontSize: 12, marginTop: 0, textAlign: "left" }}> */}
      <Segment>
        <Grid column={2} stackable>
          <Grid.Column width={4}>
            <div style={{ textAlign: 'center', margin: "0 auto" }}>
              <>
                <img src={poster.photoURL}
                  style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: '50%' }} />
              </>
            </div>
          </Grid.Column>
          <Grid.Column width={12}>
            {post.aboutMe}
          </Grid.Column>
        </Grid>
      </Segment>
    </Fragment>
  )
}

export default PostAboutPoster