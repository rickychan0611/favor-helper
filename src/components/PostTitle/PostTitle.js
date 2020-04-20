import React from 'react'
import { Segment, Rating } from 'semantic-ui-react'
import styles from './styles'

const PostTitle = ({post, poster}) => {
  return (
    <Segment placeholder basic textAlign="left">
      <h1 styles={styles.title}>{post.title}</h1>
      <p style={{ fontSize: 20 }}>
        {post.address ? post.address[2].long_name : null}</p>
      <Segment basic><Rating defaultRating={4} maxRating={5} icon='star' disabled /> ({4})
    <br /><br />
        <img src={poster.photoURL}
          style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: '50%' }} />
        <br />
        {poster.displayName}
      </Segment>
    </Segment>
  )
}

export default PostTitle