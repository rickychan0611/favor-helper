import React from 'react'
import styles from './styles'
import {
  Label,
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
  Checkbox
} from 'semantic-ui-react'

import {
  DateInput,
  TimeInput,
  DateTimeInput,
  DatesRangeInput
} from 'semantic-ui-calendar-react';

import { PreviewIcon } from '..'

const PriceTimeColumn = ({ post, poster }) => {
  const [state, setState] = React.useState()

  const handlePriceChange = (e) => {
    setState(e.target.value)
    // setFormState({ ...formState, price: e.target.value })
  }

  return (
    <Segment>
      <Header style={{ margin: 0 }}>Price: </Header>
        <h1 styles={styles.title}>${post.price}</h1>

      <Divider fluid/>
      
      <Header style={{ margin: 0 }}>Minimum Order: </Header>
      {post.minOrder}
      <Divider fluid/>

      <Header style={{ margin: 0 }}>Maximum Order: </Header>
      {post.maxOrder}
      <Divider fluid/>

      <Header style={{ margin: 0 }}>Order Cut-off Time: </Header>
      {post.CutOffTime}
      <Divider fluid/>

      <Header style={{ margin: 0 }}>Completion Date: </Header>
      {post.completionDate}
      <Divider fluid/>

      <Header style={{ margin: 0 }}>Pick up / Delivery</Header>
      Self Pick-up? {post.pickup? "Yes" : "No"} <br/>
      Delivery? {post.delivery? "Yes" : "No"}
      <Divider fluid/>

      <Header style={{ margin: 0 }}>instructions: </Header>
      {post.pickUpGuide}
     
    </Segment >

  )
}

export default PriceTimeColumn