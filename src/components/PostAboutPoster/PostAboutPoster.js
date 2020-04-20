import React, { Fragment } from 'react'
import { Segment, Header, Grid, Rating, Divider } from 'semantic-ui-react'
import styles from './styles'

const PostAboutPoster = ({ post, poster }) => {
  return (
    <Fragment>
      <Header>About our chef:  {poster.displayName}
      </Header>
      {/* <p style={{ fontSize: 12, marginTop: 0, textAlign: "left" }}> */}
      <Segment>
        <Grid column={2} stackable>
          <Grid.Column width={3}>
            <div style={{ textAlign: 'center', margin: "0 auto" }}>
              <>
                <img src={poster.photoURL}
                  style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: '50%' }} />
              </>
            </div>
          </Grid.Column>
          <Grid.Column width={13}>
            <Rating defaultRating={4} maxRating={5} icon='star' disabled /> ({4}) reviews
          <Divider />
            {post.aboutMe}
          </Grid.Column>
        </Grid>
      </Segment>
    </Fragment>
  )
}

export default PostAboutPoster