import React, { useState, useContext } from 'react'
import {
  Modal,
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
  Radio,
  Responsive
} from 'semantic-ui-react'
import styles from './styles'
import {
  PriceTimeColumn, Map, PostTitle, PostAboutMeal, PostAboutPoster, QuestionForm, QuestionsContainer
} from '../../components'

const CheckOutModal = ({ openModal, setOpenModal, post, poster }) => {
  const [qty, setQty] = useState(1)
  const [step2Modal, setStep2Modal] = useState(false)
  const [pickupOrDelivery, setPickupOrDelivery] = useState("Pick-up")

  const handlePickupOrDelivery = (e, { value }) => {
    setPickupOrDelivery(value)
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
                <h4>
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
              </h4>
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
            <Button color='green' onClick={() => { setStep2Modal(false) }}>
              {pickupOrDelivery}<Icon name='arrow right' />
            </Button> :
            <Button color='green' onClick={() => { setStep2Modal(false) }}>
              {pickupOrDelivery}<Icon name='arrow right' />
            </Button>
          }
        </Modal.Actions>
      </Modal>
    </>
  )
}

export default CheckOutModal