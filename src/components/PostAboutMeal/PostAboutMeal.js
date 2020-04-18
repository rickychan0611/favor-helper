import React, { Fragment } from 'react'
import { Segment, Header, Divider } from 'semantic-ui-react'
import styles from './styles'

const PostAboutMeal = ({ post, poster }) => {
  return (
    <Fragment>
      <Header>About this meal</Header>
      <Segment textAlign="left">
        <Header style={{ marginBottom: 0 }}>Style</Header>
        {post.dishStyle}
        <Divider fluid />
        <Header>Summary</Header>
        {post.summary}
      </Segment>
    </Fragment>
  )
}

export default PostAboutMeal