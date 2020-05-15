import React, { useState, useContext } from 'react'
import moment from 'moment'
import firebase from 'firebase'
import db from '../../firestore'
import {
  Modal,
  Grid,
  Button,
  Form,
  Header,
  Segment,
  Input,
  Container,
  Divider,
  Icon,
  Radio,
} from 'semantic-ui-react'
import styles from './styles'
import { Map } from '../../components'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { UserContext } from '../../context/UserContext'

const CheckOutModal = ({ openModal, setOpenModal, post, poster }) => {
  const { user, setUser } = useContext(UserContext)
  const [qty, setQty] = useState(1)
  const [pickupDate, setPickupDate] = useState(null)
  const [deliveryDate, setDeliveryDate] = useState(null)
  const [address, setAddress] = useState(null)
  const [phoneNumber, setPhoneNumber] = useState()
  const [deliveryForm, setDeliveryForm] = useState({})
  const [step2Modal, setStep2Modal] = useState(false)
  const [step3aModal, setStep3aModal] = useState(false)
  const [step4aModal, setStep4aModal] = useState(false)
  const [step5aModal, setStep5aModal] = useState(false)
  const [step3bModal, setStep3bModal] = useState(false)
  const [step4bModal, setStep4bModal] = useState(false)
  const [step5bModal, setStep5bModal] = useState(false)

  const [pickupOrDelivery, setPickupOrDelivery] = useState("Pick-up")

  const now = moment()

  const addDays = (theDate, days) => {
    return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
  }

  const handlePickupOrDelivery = (e, { value }) => {
    setPickupOrDelivery(value)
  }

  const handleDeliveryForm = (e, { value, name }) => {
    setDeliveryForm({ ...deliveryForm, [name]: value })
    console.log(deliveryForm)
  }

  const handlePickupDate = (e, { value }) => {
    setPickupDate(value)
  }

  const handlePhoneNumber = (e, { value }) => {
    setPhoneNumber(value)
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
      <Modal centered open={openModal} inverted dimmer='blurring'>
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
      <Modal centered open={step2Modal} inverted dimmer='blurring'>
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
          <Button icon="close" color='grey' onClick={() => { setStep2Modal(false) }} />

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
      <Modal centered open={step3aModal} inverted dimmer='blurring'>
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
          <Button icon="close" color='grey' onClick={() => { setStep3aModal(false) }} />


          <Button color='green' onClick={() => {
            setStep2Modal(true)
            setStep3aModal(false)
          }}>
            <Icon name='arrow left' />Back
          </Button>

          <Button disabled={!pickupDate} color='green' onClick={() => {
            setStep3aModal(false)
            setStep4aModal(true)
          }}>
            Next<Icon name='arrow right' />
          </Button>

        </Modal.Actions>
      </Modal>

      {/* Step4a: enter phone number */}
      <Modal centered open={step4aModal} inverted dimmer='blurring'>
        <Modal.Header>
          Enter your phone number
        </Modal.Header>
        <Modal.Content>
          <Container textAlign='center'>
            <Input
              size='large'
              type='tel'
              icon='phone'
              iconPosition='left'
              value={phoneNumber}
              onChange={handlePhoneNumber}
            />
          </Container>
          {/* </Segment> */}
        </Modal.Content>
        <Modal.Actions>
          <Button icon="close" color='grey' onClick={() => { setStep4aModal(false) }} />


          <Button color='green' onClick={() => {
            setStep3aModal(true)
            setStep4aModal(false)
          }}>
            <Icon name='arrow left' />Back
          </Button>

          <Button disabled={!phoneNumber} color='green' onClick={() => {
            setStep4aModal(false)
            setStep5aModal(true)
          }}>
            Next<Icon name='arrow right' />
          </Button>

        </Modal.Actions>
      </Modal>

      {/* Step5a: pickup confirmation */}
      <Modal centered open={step5aModal} inverted dimmer='blurring'>
        <Modal.Header>
          Confirmation
        </Modal.Header>
        <Modal.Content>
          <h4>
            Meal: {post.title}<br />
            Qty: {qty}<br />
            Total: ${qty * post.price}<br />
            Pickup address:&nbsp;
            {post.address[1].long_name},&nbsp;
            {post.address[2].long_name},&nbsp;
            {post.address[3].long_name},&nbsp;
            {post.address[4].short_name},&nbsp;
            {post.address[5].short_name}&nbsp;<br />
            Pickup Time:  {!pickupDate ? null : pickupDate.toLocaleString('en-US',
            { weekday: 'short', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true })}<br />
            Phone number: {phoneNumber}
          </h4>
        </Modal.Content>
        <Modal.Actions>
          <Button icon="close" color='grey' onClick={() => { setStep5aModal(false) }} />

          <Button color='green' onClick={() => {
            setStep4aModal(true)
            setStep5aModal(false)
          }}>
            <Icon name='arrow left' />Back
          </Button>

          <Button disabled={!phoneNumber} color='green' onClick={() => {
            setStep5aModal(false)
            // setStep5aModal(true)
          }}>
            Confirm &nbsp; <Icon name='check' />
          </Button>

        </Modal.Actions>
      </Modal>

      {/* Step3b: delivery time */}
      <Modal centered open={step3bModal} inverted dimmer='blurring'>
        <Modal.Header>
          Select a perferred delivery date/time
        </Modal.Header>
        <Modal.Content>
          <Container textAlign='center'>
            <DatePicker
              selected={new Date()}
              onChange={date => setDeliveryDate(date)}
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
            <h4>Perferred delivery time:&nbsp;
            {!deliveryDate ? null : deliveryDate.toLocaleString('en-US',
              { weekday: 'short', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true })}
            </h4><br />
            <p>(We will contact you to comfirm the actual delivery time later.)</p>
          </Container>
          {/* </Segment> */}
        </Modal.Content>
        <Modal.Actions>
          <Button icon="close" color='grey' onClick={() => { setStep3bModal(false) }} />

          <Button color='green' onClick={() => {
            setStep2Modal(true)
            setStep3bModal(false)
          }}>
            <Icon name='arrow left' />Back
          </Button>

          <Button disabled={!deliveryDate} color='green' onClick={() => {
            setStep3bModal(false)
            setStep4bModal(true)
          }}>
            Next<Icon name='arrow right' />
          </Button>

        </Modal.Actions>
      </Modal>

      {/* Step4b: enter phone number */}
      <Modal centered open={step4bModal} inverted dimmer='blurring'>
        {/* <Modal centered open={openModal} inverted dimmer='blurring'> */}
        <Modal.Header>
          Enter your shipping address
        </Modal.Header>
        <Modal.Content>
          <Form>

            <Form.Group widths='equal'>
              <Form.Input
                required
                label='First Name'
                name="firstName"
                value={deliveryForm.firstName}
                onChange={handleDeliveryForm} />
              <Form.Input
                required
                label='Last Name'
                name="lastName"
                value={deliveryForm.lastName}
                onChange={handleDeliveryForm} />
            </Form.Group>
            <Form.Input
              required
              label='Address line 1'
              name="address1"
              value={deliveryForm.address1}
              onChange={handleDeliveryForm} />
            <Form.Input
              label='Address line 2'
              name="address2"
              value={deliveryForm.address2}
              onChange={handleDeliveryForm} />
            <Form.Group widths='equal'>
              <Form.Input
                required
                label='City'
                name="city"
                value={deliveryForm.city}
                onChange={handleDeliveryForm} />
              <Form.Input
                required
                label='Province / State / Region'
                name="province"
                value={deliveryForm.province}
                onChange={handleDeliveryForm} />
              <Form.Input
                label='Postal code / zip'
                name="postalCode"
                value={deliveryForm.postalCode}
                onChange={handleDeliveryForm} />
              <Form.Input
                required
                label='Country'
                name="country"
                value={deliveryForm.country}
                onChange={handleDeliveryForm} />
            </Form.Group>
            <Form.Input
              required
              label='Phone Number'
              name="phoneNumber"
              value={deliveryForm.phoneNumber}
              onChange={handleDeliveryForm} />
            <Form.TextArea
              label='Delivery Instruction'
              placeholder="ex. Buzz number or enter from back door."
              name="deliveryInstruction"
              value={deliveryForm.deliveryInstruction}
              onChange={handleDeliveryForm} />
            {/* </Segment> */}

            <Divider />
            <div style={{ float: 'right', marginBottom: 20 }}>
              <Button icon="close" color='grey' onClick={() => { setStep4bModal(false) }} />

              <Button color='green' onClick={() => {
                setStep3bModal(true)
                setStep4bModal(false)
              }}>
                <Icon name='arrow left' />Back
          </Button>

              <Button content='Submit' color='green' onClick={() => {
                if (
                  deliveryForm.firstName &&
                  deliveryForm.lastName &&
                  deliveryForm.address1 &&
                  deliveryForm.city &&
                  deliveryForm.province &&
                  deliveryForm.country &&
                  deliveryForm.phoneNumber
                ) {
                  setStep4bModal(false)
                  setStep5bModal(true)
                }
              }}>
                Next<Icon name='arrow right' />
              </Button>
            </div>
          </Form>

        </Modal.Content>

      </Modal>

      {/* Step5b: pickup confirmation */}
      <Modal centered open={step5bModal} inverted dimmer='blurring'>
        <Modal.Header>
          Confirmation
        </Modal.Header>
        <Modal.Content>
          <h4>
            <table>
              <tr>
                <td>Meal: </td>
                <td>{post.title}</td>
              </tr>
              <tr>
                <td>Qty: </td>
                <td>{qty}</td>
              </tr>
              <tr>
                <td>Total: </td>
                <td>${qty * post.price}</td>
              </tr>
              <tr>
                <td>Delivery address:</td>
                <td>{deliveryForm.firstName + " " + deliveryForm.lastName}</td>
              </tr>
              <tr>
                <td> </td>
                <td>{deliveryForm.address1}</td>
              </tr>
              {deliveryForm.address2 ?
                <tr>
                  <td> </td>
                  <td>{deliveryForm.address2}</td>
                </tr> : null
              }
              <tr>
                <td> </td>
                <td>{deliveryForm.city}, {deliveryForm.province}</td>
              </tr>
              {deliveryForm.postalCode ?
                <tr>
                  <td> </td>
                  <td>{deliveryForm.postalCode}, {deliveryForm.country}</td>
                </tr> : null
              }
              <tr>
                <td> </td>
                <td>{deliveryForm.country}</td>
              </tr>
                {deliveryForm.deliveryInstruction ?
                  <tr>
                    <td>Delivery instruction:</td>
                    <td>{deliveryForm.deliveryInstruction}</td>
                  </tr> : null
                }
                <tr>
                  <td>Delivery Time:  </td>
                  <td>{!deliveryDate ? null : deliveryDate.toLocaleString('en-US',
                    { weekday: 'short', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true })}</td>
                </tr>
                <tr>
                  <td>Phone number:</td>
                  <td>{deliveryForm.phoneNumber}</td>
                </tr>
            </table>
          </h4>
        </Modal.Content>
          <Modal.Actions>
            <Button icon="close" color='grey' onClick={() => { setStep5bModal(false) }} />

            <Button color='green' onClick={() => {
              setStep4bModal(true)
              setStep5bModal(false)
            }}>
              <Icon name='arrow left' />Back
          </Button>

            <Button color='green' onClick={() => {
              setStep5bModal(false)
              // setStep5aModal(true)
            }}>
              Confirm &nbsp; <Icon name='check' />
            </Button>

          </Modal.Actions>
      </Modal>
    </>
  )
}

export default CheckOutModal