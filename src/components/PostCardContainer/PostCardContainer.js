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
  Divider,
  Icon,
  Checkbox,
  Responsive
} from 'semantic-ui-react'
import styles from './styles'

import noImage from '../../assets/images/no-image.jpg'

const PostCardContainer = ({ item }) => {
  return (
    <div style={styles.container}>
      <img src={item.images.length > 0 ? item.images[0].src : noImage}
        style={styles.img} />
        <h1>hello</h1>
    </div>
  )
}

export default PostCardContainer