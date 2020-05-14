import React, { useState, useContext } from 'react'
import moment from 'moment'
import {
  Modal,
  Grid,
  Button,
  Form,
  Header,
  Segment,
  Input,
  Rating,
  Container,
  Divider,
  Icon,
  Radio,
  Responsive
} from 'semantic-ui-react'
import styles from './styles'
import {
  PriceTimeColumn, Map, PostTitle, PostAboutMeal, PostAboutPoster, QuestionForm, QuestionsContainer
} from '../../components'
import {
  DateInput,
  TimeInput,
  DateTimeInput,
  DatesRangeInput
} from 'semantic-ui-calendar-react';
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

const CheckOutModal = ({ openModal, setOpenModal, post, poster }) => {
  const [qty, setQty] = useState(1)
  const [step2Modal, setStep2Modal] = useState(false)
  const [step3aModal, setStep3aModal] = useState(false)
  const [step3bModal, setStep3bModal] = useState(false)
  const [pickupOrDelivery, setPickupOrDelivery] = useState("Pick-up")
  const now = moment()
  const [pickupDate, setPickupDate] = useState(null)

  const addDays = (theDate, days) => {
    return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
  }

  const handlePickupOrDelivery = (e, { value }) => {
    setPickupOrDelivery(value)
  }

  const handlePickupDate = (e, { value }) => {
    setPickupDate(value)
  }

  const handleQty = (counter) => {
    if (qty == 1 && counter == -1) {
      return
    }
    else {
      setQty(qty + counter)
    }
  }

  return (
    <>
      {/* Step 1 */}
      <Modal open={openModal} inverted dimmer='blurring'>
        <Modal.Header>
          Set your quantity
        </Modal.Header>
        <Modal.Content>
          <Segment placeholder basic>
            <Header icon>
              How many do you want?
             </Header>
            <Grid centered column={3}>
              <Grid.Column width={3}>
                <Button circular size="large" icon='minus'
                  onClick={() => { handleQty(-1) }} />
              </Grid.Column>
              <Grid.Column textAlign='center' width={3}>
                <h1>{qty}</h1>
              </Grid.Column>
              <Grid.Column width={3}>
                <Button circular size="large" icon='plus'
                  onClick={() => { handleQty(1) }} />
              </Grid.Column>
            </Grid>
          </Segment>
        </Modal.Content>
        <Modal.Actions>
          <Button color='grey' onClick={() => { setOpenModal(false) }}>
            <Icon name='close' /> Cancel
          </Button>
          <Button color='green'
            onClick={() => {
              setStep2Modal(true)
              setOpenModal(false)
            }}>
            Next<Icon name='arrow right' />
          </Button>
        </Modal.Actions>
      </Modal>

      {/* Step 2 */}
      <Modal open={step2Modal} inverted dimmer='blurring'>
        <Modal.Header>
          Self-pickup or delivery?
        </Modal.Header>
        <Modal.Content>
          <Grid columns={2} stackable>
            <Grid.Column width={8}>
              <Map style={{ marginTop: -10 }} height={300} width='100%' noSearchBar currentLocation={post.location} />
            </Grid.Column>
            <Grid.Column width={8}>
              <Modal.Description>
                <h5>
                  <Header>Please choose one:</Header>
                  <Radio
                    label="Self-pickup"
                    name='Pick-up'
                    value='Pick-up'
                    checked={pickupOrDelivery === "Pick-up"}
                    onChange={handlePickupOrDelivery}
                  /><br />
                  {post.address[2].long_name},&nbsp;
                  {post.address[4].short_name},&nbsp;
                  {post.address[5].short_name}&nbsp;
              </h5>
                <Divider horizontal>Or</Divider>
                <h4>
                  <Radio
                    label="Delivery"
                    name='Delivery'
                    value='Delivery'
                    checked={pickupOrDelivery === "Delivery"}
                    onChange={handlePickupOrDelivery}
                  />
                </h4>
                <br />
              </Modal.Description>
            </Grid.Column>
          </Grid>

        </Modal.Content>
        <Modal.Actions>
          <Button color='grey' onClick={() => { setStep2Modal(false) }}>
            <Icon name='close' />
          </Button>
          <Button color='green' onClick={() => {
            setOpenModal(true)
            setStep2Modal(false)
          }}>
            <Icon name='arrow left' />Back
          </Button>
          {pickupOrDelivery === 'Delivery' ?
            <Button color='green' onClick={() => {
              setStep2Modal(false)
              setStep3bModal(true)
            }}>
              {pickupOrDelivery}<Icon name='arrow right' />
            </Button> :
            <Button color='green' onClick={() => {
              setStep2Modal(false)
              setStep3aModal(true)
            }}>
              {pickupOrDelivery}<Icon name='arrow right' />
            </Button>
          }
        </Modal.Actions>
      </Modal>

      {/* Step3a: pickup time */}
      <Modal open={step3aModal} inverted dimmer='blurring'>
        <Modal.Header>
          Select a pickup date/time
        </Modal.Header>
        <Modal.Content>
          <Container textAlign='center'>
            <DatePicker
              selected={new Date()}
              onChange={date => setPickupDate(date)}
              showTimeSelect
              timeFormat="h:mm aa"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy"
              inline
              minDate={new Date()}
              // maxDate={moment().add(2,'d').toDate()}
              minTime={now.hours(10).minutes(0).toDate()}
              maxTime={now.hours(21).minutes(45).toDate()}
            />
            <h4>Pickup time:&nbsp;
            {!pickupDate ? null : pickupDate.toLocaleString('en-US',
              { weekday: 'short', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true })}
            </h4>
          </Container>
          {/* </Segment> */}
        </Modal.Content>
        <Modal.Actions>
          <Button color='grey' onClick={() => { setStep3aModal(false) }}>
            <Icon name='close' />
          </Button>

          <Button color='green' onClick={() => {
            setStep2Modal(true)
            setStep3aModal(false)
          }}>
            <Icon name='arrow left' />Back
          </Button>

          <Button disabled={!pickupDate} color='green' onClick={() => {
            setStep3aModal(false)
            // setStep4aModal(true)
          }}>
            Next<Icon name='arrow right' />
          </Button>

        </Modal.Actions>
      </Modal>

    </>
  )
}

export default CheckOutModal