import React from 'react'
import {
  Container,
  Grid,
  Button,
  Form,
  Header,
  Segment,
  Input,
  Rating,
  Image,
  Modal,
  Icon,
  Dimmer,
  Loader
} from 'semantic-ui-react'
import styles from './styles'

const Post = ({ post, loading }) => {
  return (
    <div>
      {loading ?
        <Dimmer active inverted>
          <Loader inverted content='Loading' />
        </Dimmer>
        :
        post ?
          <Segment placeholder basic textAlign="center">
            <h1 styles={styles.title}>{post.title}</h1>
            <p style={{ fontSize: 20 }}>
              {post.address ? post.address[2].long_name : null}</p>
              
          </Segment>

          :
          <h1>Page not found</h1>
      }
    </div>
  )
}

export default Post