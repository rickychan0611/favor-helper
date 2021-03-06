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

import { PreviewIcon } from '../../../components'

const PriceTimeForm = ({ preview, formState, setFormState, handleChange, pickUpToggle, deliveryToggle }) => {
  const [state, setState] = React.useState()

  const handlePriceChange = (e) => {
    setState(e.target.value)
    // setFormState({ ...formState, price: e.target.value })
  }

  return (
    <Segment>
      <PreviewIcon preview={preview} required={true} />
      <Header style={{ margin: 0 }}>Price: </Header>
      {preview ?
        <h1 styles={styles.title}>${formState.price}</h1>
        :
        <Input
          fluid
          label={{ basic: true, content: '$' }}
          type='number'
          labelPosition='left'
          placeholder='Amount'
          name="price"
          size="big"
          value={formState.price}
          onChange={handleChange}
        >
        </Input>
      }

      <Divider />

      <Form>

        <PreviewIcon preview={preview} />
        <Header style={{ margin: 0 }}>Minimum Order: </Header>
        <p style={{ fontSize: 12, marginTop: 0 }}> Start cooking only when min. order is met. Leave it blank if you can start cooking even with only 1 order.</p>
        <Input fluid icon='stopwatch' iconPosition='left' placeholder='Enter a number' type='number'
          value={formState.minOrder} onChange={(e) => { setFormState({ ...formState, minOrder: e.target.value }) }} />
        <Divider />

        <PreviewIcon preview={preview} />
        <Header style={{ margin: 0 }}>Maximum Order: </Header>
        <p style={{ fontSize: 12, marginTop: 0 }}> Can't cook too many dishes? Stop getting orders while max. order has reached. Leave it blank if you have no limit. </p>
        <Input fluid icon='stopwatch' iconPosition='left' placeholder='Enter a number' type='number'
          value={formState.maxOrder} onChange={(e) => { setFormState({ ...formState, maxOrder: e.target.value }) }} />
        <Divider />

        {/* ------------------- Cut off Time ------------------*/}
        <PreviewIcon preview={preview} />
        <Header style={{ margin: 0 }}>Order Cut-off Time:</Header>
        <p style={{ fontSize: 12, marginTop: 0 }}>Let time to cook? Set a time that you want to stop receiving orders. So that you can get prepared. Leave it blank if you can receive order continuously.</p>
        <DateTimeInput
          hideMobileKeyboard
          name="CutOffTime"
          placeholder="Select a time"
          value={formState.CutOffTime}
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
        <p style={{ fontSize: 12, marginTop: 0 }}>The date that your food is ready for distributing to customers! Leave it blank if you do it everyday.</p>
        <DateInput
          hideMobileKeyboard
          name="completionDate"
          placeholder="Select a date"
          value={formState.completionDate}
          iconPosition="left"
          clearable
          closable
          clearIcon={<Icon name="remove" color="red" />}
          onChange={handleChange} />
        <Divider />

        {/* ------------------- Pick up / Delivery ------------------*/}
        <PreviewIcon preview={preview} required={true} />
        <Header style={{ margin: 0 }}>Pick up / Delivery </Header>
        <p style={{ fontSize: 12, marginTop: 0 }}>Can be both. You can arrange with customer later. </p>
        <Checkbox
          label="Self-pickup"
          onChange={pickUpToggle}
          checked={formState.pickUp}
        /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Checkbox
          label="Delivery within 1km"
          onChange={deliveryToggle}
          checked={formState.delivery}
        />
        <br></br>
        <br></br>
        <Form.TextArea fluid label='Pick up and/or delievery instructions' name="pickUpGuide"
          style={{ minHeight: 100 }}
          value={formState.pickUpGuide} onChange={handleChange}
          placeholder='Briefly tell your customers how to pick up or how should the meal be delivered.' />
      </Form>
    </Segment >

  )
}

export default PriceTimeForm