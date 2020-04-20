import React, { Fragment } from 'react'
import { Segment, Header, Divider } from 'semantic-ui-react'
import styles from './styles'

const PostAboutMeal = ({ post, poster }) => {
  return (
    <Fragment>
      {/* <Header>About this meal</Header> */}
      {/* <Segment textAlign="left"> */}
      {/* <Header style={{ marginBottom: 0 }}>Style</Header>
        {post.dishStyle} */}
      {/* <Divider fluid /> */}
      <h4 style={{color:'grey'}}>Description: </h4>
      {post.summary}
        <br/><br/>
      {/* </Segment> */}
    </Fragment>
  )
}

export default PostAboutMeal