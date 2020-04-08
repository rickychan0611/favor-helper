import React from 'react'
import styles from './styles'
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
  Checkbox
} from 'semantic-ui-react'

import {
  DateInput,
  TimeInput,
  DateTimeInput,
  DatesRangeInput
} from 'semantic-ui-calendar-react';

const PriceTimeForm = ({state, handleChange, pickUpToggle, deliveryToggle}) => {
  return (
    <Segment>
      <Header as='h1'>$15</Header>
      <Divider />

      {/* ------------------- Cut off Time ------------------*/}
      <Form>
        <Header style={{ margin: 0 }}>Order Cut off Time:</Header>
        <p style={{ fontSize: 12, marginTop: 0 }}>The time that you want to stop receiving orders. So that you can prepare and cook.</p>
        <DateTimeInput
          hideMobileKeyboard
          name="CutOffTime"
          placeholder="Select a time"
          value={state.CutOffTime}
          iconPosition="left"
          clearable
          closable
          clearIcon={<Icon name="remove" color="red" />}
          onChange={handleChange}
        />
        <Divider />

        {/* ------------------- Completion Date ------------------*/}
        <Header style={{ margin: 0 }}>Completion Date: </Header>
        <p style={{ fontSize: 12, marginTop: 0 }}>The date that your food is ready to be distributed to customers.</p>
        <DateInput
          hideMobileKeyboard
          name="completionDate"
          placeholder="Select a date"
          value={state.completionDate}
          iconPosition="left"
          clearable
          closable
          clearIcon={<Icon name="remove" color="red" />}
          onChange={handleChange} />
        <Divider />

        {/* ------------------- Pick up / Delivery ------------------*/}
        <Header style={{ margin: 0 }}>Pick up / Delivery? </Header>
        <p style={{ fontSize: 12, marginTop: 0 }}>Can be both. You can arrange with customer later. </p>
        <Checkbox
          label="Self-pickup"
          onChange={pickUpToggle}
        /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Checkbox
          label="Delivery within 1km"
          onChange={deliveryToggle}
        />
      </Form>
    </Segment>

  )
}

export default PriceTimeForm