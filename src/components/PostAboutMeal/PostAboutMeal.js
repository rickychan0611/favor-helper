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
      <h4 style={{color:'grey', marginBottom: 0 }}>Description:</h4>
      <h4 style={{whiteSpace: 'pre-line', marginTop: 3}}>{post.summary}</h4>
        <br/>
      {/* </Segment> */}
    </Fragment>
  )
}

export default PostAboutMeal