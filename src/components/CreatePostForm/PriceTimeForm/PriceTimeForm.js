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

import { PreviewIcon } from '../../../components'

const PriceTimeForm = ({ preview, state, setState, handleChange, pickUpToggle, deliveryToggle }) => {
  return (
    <Segment>
      <Header as='h1'>$15</Header>
      <Divider />

      <Form>
        <PreviewIcon preview={preview} />
        <Header style={{ margin: 0 }}>Minimum Order: </Header>
        <p style={{ fontSize: 12, marginTop: 0 }}> Start cooking only when min. order is met. (0 = no min. order)</p>
        <Input fluid icon='stopwatch' iconPosition='left' placeholder='Enter a number' type='number'
          value={state.minOrder} onChange={(e) => { setState({ ...state, minOrder: e.target.value }) }} />
        <Divider />

        <PreviewIcon preview={preview} />
        <Header style={{ margin: 0 }}>Maximum Order: </Header>
        <p style={{ fontSize: 12, marginTop: 0 }}> Can't cook too many dishes? Stop getting orders while max. order has reached. (0 = no max. order)</p>
        <Input fluid icon='stopwatch' iconPosition='left' placeholder='Enter a number' type='number'
          value={state.maxOrder} onChange={(e) => { setState({ ...state, maxOrder: e.target.value }) }} />
        <Divider />

        {/* ------------------- Cut off Time ------------------*/}
        <PreviewIcon preview={preview} />
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
        <PreviewIcon preview={preview} />
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
        <PreviewIcon preview={preview} />
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