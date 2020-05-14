import React, { useState } from 'react'
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
  Checkbox,
  Modal
} from 'semantic-ui-react'

import {
  DateInput,
  TimeInput,
  DateTimeInput,
  DatesRangeInput
} from 'semantic-ui-calendar-react';

import { PreviewIcon } from '..'
import CheckOutModal from '../CheckOutModal';

const PriceTimeColumn = ({ post, poster }) => {
  const [state, setState] = useState()
  const [openModal, setOpenModal] = useState(false)
  const handlePriceChange = (e) => {
    setState(e.target.value)
    // setFormState({ ...formState, price: e.target.value })
  }

  return (
    <>
      <CheckOutModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        post={post}
        poster={poster}
      />
      <Segment >
        <Segment>
          <Header as='h1'>Price:  ${post.price} </Header>
          <Button fluid color="green" size='big' onClick={() => { setOpenModal(true) }}>I'm Hungry. Request Meal</Button>
        </Segment>
        <Divider fluid />

        <Header style={{ margin: 0 }}>Minimum Order: </Header>
        {post.minOrder}
        <Divider fluid />

        <Header style={{ margin: 0 }}>Maximum Order: </Header>
        {post.maxOrder}
        <Divider fluid />

        <Header style={{ margin: 0 }}>Order Cut-off Time: </Header>
        {post.CutOffTime}
        <Divider fluid />

        <Header style={{ margin: 0 }}>Completion Date: </Header>
        {post.completionDate}
        <Divider fluid />

        <Header style={{ margin: 0 }}>Pick up / Delivery</Header>
      Self Pick-up? {post.pickup ? "Yes" : "No"} <br />
      Delivery? {post.delivery ? "Yes" : "No"}
        <Divider fluid />

        <Header style={{ margin: 0 }}>instructions: </Header>
        {post.pickUpGuide}
      </Segment >
    </>
  )
}

export default PriceTimeColumn