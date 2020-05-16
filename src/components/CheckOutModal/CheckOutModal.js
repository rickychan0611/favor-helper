import React, { useState, useContext, useEffect } from 'react'
import moment from 'moment'
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
  const [deliveryForm, setDeliveryForm] = useState({})
  const [step2Modal, setStep2Modal] = useState(false)
  const [step3aModal, setStep3aModal] = useState(false)
  const [step4aModal, setStep4aModal] = useState(false)
  const [step5aModal, setStep5aModal] = useState(false)
  const [step3bModal, setStep3bModal] = useState(false)
  const [step4bModal, setStep4bModal] = useState(false)
  const [step5bModal, setStep5bModal] = useState(false)
  const [pickupOrDelivery, setPickupOrDelivery] = useState("Pick-up")
  const [loading, setLoading] = useState(false)
  const [confirmedModal, setConfirmedModal] = useState(false)
  const now = moment()

  const addDays = (theDate, days) => {
    return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
  }

  const handlePickupOrDelivery = (e, { value }) => {
    setPickupOrDelivery(value)
  }

  const handleDeliveryForm = (e, { value, name }) => {
    setDeliveryForm({ ...deliveryForm, [name]: value })
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

  const clearField = (name) => {
    setDeliveryForm({ [name]: '' })
  }

  const submitDeliveryOrder = () => {
    setLoading(true)
    db.collection('users').doc(user.id).update(
      { address: deliveryForm }
    )
    let newOrder = db.collection('orders').doc()
    newOrder.set({
      id: newOrder.id,
      createAt: new Date(),
      buyerUid: user.uid,
      posterUid: post.posterUid,
      shippingMethod: pickupOrDelivery,
      deliveryForm,
      deliveryDate,
    }).then(doc => {
      setLoading(false)
      setStep5aModal(false)
      setStep5bModal(false)
      setConfirmedModal(true)
      setQty(1)
      setPickupDate(null)
      setDeliveryDate(null)
    })
  }

  const submitPickupOrder = () => {
    setLoading(true)
    db.collection('users').doc(user.id).update(
      { address: { phoneNumber: deliveryForm.phoneNumber } }
    )
    let newOrder = db.collection('orders').doc()
    newOrder.set({
      id: newOrder.id,
      createAt: new Date(),
      buyerUid: user.uid,
      posterUid: post.posterUid,
      shippingMethod: pickupOrDelivery,
      pickupAddress: post.address
    }).then(doc => {
      setLoading(false)
      setStep5aModal(false)
      setStep5bModal(false)
      setConfirmedModal(true)
      setQty(1)
      setPickupDate(null)
      setDeliveryDate(null)
    })
  }

  useEffect(() => {
    if (user) {
      setDeliveryForm(user.address)
    }
  }, [user])

  return (
    <>
      {/* Step 1 */}
      <Modal centered={false} open={openModal} dimmer='inverted' style={{ width: '90vw', maxWidth: 550, marginTop: 80 }}>
        <Modal.Header
          style={{
            backgroundImage: 'linear-gradient(to top right, #9991c9, #e5c1cd)',
            color: "white",
            marginBottom: 15
          }}>
          Set your quantity
        </Modal.Header>
        <Modal.Content>
          <Header icon>
            How many do you want?
             </Header><br />
          <Button circular size="large" icon='minus'
            onClick={() => { handleQty(-1) }} />
          <span style={{ fontSize: 28, verticalAlign: 'sub', marginLeft: 12, marginRight: 14 }}>{qty}</span>
          <Button circular size="large" icon='plus'
            onClick={() => { handleQty(1) }} />
          <br /> <br /> <br />
          <Form>
            <h3>
              Any special request or message for your order?&nbsp;(optional)
            </h3>
            <Form.TextArea
              // label="Any special request or message for your order? (optional)"
              placeholder="ex. allergy to peanut or put a name on the birthday cake"
              value={deliveryForm.request}
              onChange={(e, { value }) => {
                setDeliveryForm({ ...deliveryForm, request: value })
              }}
            />
          </Form>
          {/* </Segment> */}
        </Modal.Content>
        <Modal.Actions>
          <Button style={{ backgroundColor: "#bcbbbd", color: "white" }}
            onClick={() => { setOpenModal(false) }}>
            <Icon name='close' /> Cancel
          </Button>
          <Button style={{
            backgroundImage: 'linear-gradient(to top right, #7775fa, #9a99f0)',
            color: "white"
          }}
            onClick={() => {
              setStep2Modal(true)
              setOpenModal(false)
            }}>
            Next<Icon name='arrow right' />
          </Button>
        </Modal.Actions>
      </Modal>

      {/* Step 2 */}
      <Modal centered={false} open={step2Modal} dimmer='inverted' style={{ width: '90vw', maxWidth: 550, marginTop: 80 }}>
        <Modal.Header
          style={{
            backgroundImage: 'linear-gradient(to top right, #9991c9, #e5c1cd)',
            color: "white",
            marginBottom: 15
          }}>
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
          <Button icon="close" style={{ backgroundColor: "#bcbbbd", color: "white" }}
            onClick={() => { setStep2Modal(false) }} />

          <Button style={{
            backgroundImage: 'linear-gradient(to top right, #7775fa, #9a99f0)',
            color: "white"
          }}
            onClick={() => {
              setOpenModal(true)
              setStep2Modal(false)
            }}>
            <Icon name='arrow left' />Back
          </Button>

          {pickupOrDelivery === 'Delivery' ?
            <Button style={{
              backgroundImage: 'linear-gradient(to top right, #7775fa, #9a99f0)',
              color: "white"
            }}
              onClick={() => {
                setStep2Modal(false)
                setStep3bModal(true)
              }}>
              {pickupOrDelivery}<Icon name='arrow right' />
            </Button> :
            <Button style={{
              backgroundImage: 'linear-gradient(to top right, #7775fa, #9a99f0)',

              color: "white"
            }} onClick={() => {
              setStep2Modal(false)
              setStep3aModal(true)
            }}>
              {pickupOrDelivery}<Icon name='arrow right' />
            </Button>
          }

        </Modal.Actions>
      </Modal>

      {/* Step3a: pickup time */}
      <Modal centered={false} open={step3aModal} dimmer='inverted' style={{ width: '90vw', maxWidth: 550, marginTop: 80 }}>
        <Modal.Header
          style={{
            backgroundImage: 'linear-gradient(to top right, #9991c9, #e5c1cd)',
            color: "white",
            marginBottom: 15
          }}>
          Select a pickup date/time
        </Modal.Header>
        <Modal.Content>
        <div style={{ width: '100%', minWidth: 300, textAlign: 'center' }}>
            <div>            
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
            </div>
            <h4>Pickup time:&nbsp;
            {!pickupDate ? null : pickupDate.toLocaleString('en-US',
              { weekday: 'short', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true })}
            </h4>
            </div>
          {/* </Segment> */}
        </Modal.Content>
        <Modal.Actions>
          <Button icon="close" style={{ backgroundColor: "#bcbbbd", color: "white" }}
            onClick={() => { setStep3aModal(false) }} />

          <Button style={{
            backgroundImage: 'linear-gradient(to top right, #7775fa, #9a99f0)',

            color: "white"
          }} onClick={() => {
            setStep2Modal(true)
            setStep3aModal(false)
          }}>
            <Icon name='arrow left' />Back
          </Button>

          <Button disabled={!pickupDate}
            style={pickupDate ?
              {
                backgroundImage: 'linear-gradient(to top right, #7775fa, #9a99f0)',
                color: "white"
              } :
              {
                backgroundImage: 'linear-gradient(to top right, #7775fa, #9a99f0)',
                color: "grey"
              }}
            onClick={() => {
              setStep3aModal(false)
              setStep4aModal(true)
            }}>
            Next<Icon name='arrow right' />
          </Button>

        </Modal.Actions>
      </Modal>

      {/* Step4a: enter phone number */}
      <Modal centered={false} open={step4aModal} dimmer='inverted' style={{ width: '90vw', maxWidth: 550, marginTop: 80 }}>
        <Modal.Header
          style={{
            backgroundImage: 'linear-gradient(to top right, #9991c9, #e5c1cd)',
            color: "white",
            marginBottom: 15
          }}>
          Enter your phone number
        </Modal.Header>
        <Modal.Content>
          <Container textAlign='center'>
            <Input
              size='large'
              type='tel'
              icon='phone'
              iconPosition='left'
              value={deliveryForm.phoneNumber}
              onChange={(e, { value }) => {
                setDeliveryForm({ ...deliveryForm, phoneNumber: value })
              }}
            />
            &nbsp;<Icon name='close' link onClick={() => { clearField("phoneNumber") }} />
          </Container>
          {/* </Segment> */}
        </Modal.Content>
        <Modal.Actions>
          <Button icon="close"
            style={{ backgroundColor: "#bcbbbd", color: "white" }}
            onClick={() => { setStep4aModal(false) }} />

          <Button style={{
            backgroundImage: 'linear-gradient(to top right, #7775fa, #9a99f0)',
            color: "white"
          }} onClick={() => {
            setStep3aModal(true)
            setStep4aModal(false)
          }}>
            <Icon name='arrow left' />Back
          </Button>

          <Button disabled={!deliveryForm.phoneNumber}
            style={deliveryForm.phoneNumber ?
              {
                backgroundImage: 'linear-gradient(to top right, #7775fa, #9a99f0)',
                color: "white"
              } :
              {
                backgroundImage: 'linear-gradient(to top right, #7775fa, #9a99f0)',
                color: "grey"
              }}
            onClick={() => {
              setStep4aModal(false)
              setStep5aModal(true)
            }}>
            Next<Icon name='arrow right' />
          </Button>

        </Modal.Actions>
      </Modal>

      {/* Step5a: pickup confirmation */}
      <Modal centered={false} open={step5aModal} dimmer='inverted' style={{ width: '90vw', maxWidth: 550, marginTop: 80 }}>
        <Modal.Header
          style={{
            backgroundImage: 'linear-gradient(to top right, #9991c9, #e5c1cd)',
            color: "white",
            marginBottom: 15
          }}>
          Confirmation
        </Modal.Header>
        <Modal.Content>
          <h4>
            <table>
              <tr>
                <td>Meal:</td>
                <td>{post.title}</td>
              </tr>
              <tr>
                <td>Qty:</td>
                <td>{qty}</td>
              </tr>
              <tr>
                <td>Total:</td>
                <td>${qty * post.price}</td>
              </tr>
              <tr>
                <td>Pickup address:</td>
                <td>{post.address[1].long_name}</td>
              </tr>
              <tr>
                <td> </td>
                <td>{post.address[2].long_name}</td>
              </tr>
              <tr>
                <td> </td>
                <td>{post.address[3].long_name}</td>
              </tr>
              <tr>
                <td> </td>
                <td>{post.address[4].short_name}</td>
              </tr>
              <tr>
                <td> </td>
                <td>{post.address[5].short_name}</td>
              </tr>
              <tr>
                <td>Pickup Time: </td>
                <td>{!pickupDate ? null : pickupDate.toLocaleString('en-US',
                  { weekday: 'short', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true })}</td>
              </tr>
              <tr>
                <td>Phone number: </td>
                <td>{deliveryForm.phoneNumber}</td>
              </tr>
              {deliveryForm.request ?
                <tr>
                  <td>Special Request: </td>
                  <td>{deliveryForm.request}</td>
                </tr>
                : null}
            </table>
          </h4>
        </Modal.Content>
        <Modal.Actions>
          <Button icon="close" style={{ backgroundColor: "#bcbbbd", color: "white" }}
            onClick={() => { setStep5aModal(false) }} />

          <Button style={{
            backgroundImage: 'linear-gradient(to top right, #7775fa, #9a99f0)',
            color: "white"
          }} onClick={() => {
            setStep4aModal(true)
            setStep5aModal(false)
          }}>
            <Icon name='arrow left' />Back
          </Button>

          {!loading ?
            <Button style={{
              backgroundImage: 'linear-gradient(to top right, #7775fa, #9a99f0)',
              color: "white"
            }} onClick={() => {
              submitPickupOrder()
            }}>
              Confirm &nbsp; <Icon name='check' />
            </Button> :
            <Button style={{
              backgroundImage: 'linear-gradient(to top right, #7775fa, #9a99f0)',

              color: "white"
            }} loading onClick={() => {
            }}>Loading</Button>
          }

        </Modal.Actions>
      </Modal>

      {/* Step3b: delivery time */}
      <Modal centered={false} open={step3bModal} dimmer='inverted' style={{ width: '90vw', maxWidth: 550,  marginTop: 80 }}>
        <Modal.Header
          style={{
            backgroundImage: 'linear-gradient(to top right, #9991c9, #e5c1cd)',
            color: "white",
            marginBottom: 15
          }}>
          Select a perferred delivery date/time
        </Modal.Header>
        <Modal.Content>
          <div style={{ width: '100%', minWidth: 300, textAlign: 'center' }}>
            <div>
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
            </div>
            <h4>Perferred delivery time:&nbsp;
            {!deliveryDate ? null : deliveryDate.toLocaleString('en-US',
              { weekday: 'short', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true })}
            </h4><br />
            <p>(We will contact you to comfirm the actual delivery time later.)</p>
          </div>
          {/* </Segment> */}
        </Modal.Content>
        <Modal.Actions>
          <Button icon="close" style={{ backgroundColor: "#bcbbbd", color: "white" }}
            onClick={() => { setStep3bModal(false) }} />

          <Button style={{
            backgroundImage: 'linear-gradient(to top right, #7775fa, #9a99f0)',
            color: "white"
          }} onClick={() => {
            setStep2Modal(true)
            setStep3bModal(false)
          }}>
            <Icon name='arrow left' />Back
          </Button>

          <Button disabled={!deliveryDate}
            style={deliveryDate ?
              {
                backgroundImage: 'linear-gradient(to top right, #7775fa, #9a99f0)',
                color: "white"
              } :
              {
                backgroundImage: 'linear-gradient(to top right, #7775fa, #9a99f0)',
                color: "grey"
              }}
            onClick={() => {
              setStep3bModal(false)
              setStep4bModal(true)
            }}>
            Next<Icon name='arrow right' />
          </Button>

        </Modal.Actions>
      </Modal>

      {/* Step4b: enter phone number */}
      <Modal centered={false} open={step4bModal} dimmer='inverted' style={{ width: '90vw', maxWidth: 550, marginTop: 80 }}>
        <Modal.Header
          style={{
            backgroundImage: 'linear-gradient(to top right, #9991c9, #e5c1cd)',
            color: "white",
            marginBottom: 15
          }}>
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
                onChange={handleDeliveryForm}
                icon={<Icon name='close' link onClick={() => { clearField("firstName") }} />}
              />
              <Form.Input
                required
                label='Last Name'
                name="lastName"
                value={deliveryForm.lastName}
                onChange={handleDeliveryForm}
                icon={<Icon name='close' link onClick={() => { clearField("lastName") }} />}
              />
            </Form.Group>
            <Form.Input
              required
              label='Address line 1'
              name="address1"
              value={deliveryForm.address1}
              onChange={handleDeliveryForm}
              icon={<Icon name='close' link onClick={() => { clearField("address1") }} />}
            />
            <Form.Input
              label='Address line 2'
              name="address2"
              value={deliveryForm.address2}
              onChange={handleDeliveryForm}
              icon={<Icon name='close' link onClick={() => { clearField("address2") }} />}
            />
            <Form.Group widths='equal'>
              <Form.Input
                required
                label='City'
                name="city"
                value={deliveryForm.city}
                onChange={handleDeliveryForm}
                icon={<Icon name='close' link onClick={() => { clearField("city") }} />}
              />
              <Form.Input
                required
                label='Province / State / Region'
                name="province"
                value={deliveryForm.province}
                onChange={handleDeliveryForm}
                icon={<Icon name='close' link onClick={() => { clearField("province") }} />}
              />
              <Form.Input
                label='Postal code / zip'
                name="postalCode"
                value={deliveryForm.postalCode}
                onChange={handleDeliveryForm}
                icon={<Icon name='close' link onClick={() => { clearField("postalCode") }} />}
              />
              <Form.Input
                required
                label='Country'
                name="country"
                value={deliveryForm.country}
                onChange={handleDeliveryForm}
                icon={<Icon name='close' link onClick={() => { clearField("country") }} />}
              />
            </Form.Group>
            <Form.Input
              required
              label='Phone Number'
              name="phoneNumber"
              value={deliveryForm.phoneNumber}
              onChange={handleDeliveryForm}
              icon={<Icon name='close' link onClick={() => { clearField("phoneNumber") }} />}
            />
            <Form.TextArea
              label='Delivery Instruction'
              placeholder="ex. Buzz number or enter from back door."
              name="deliveryInstruction"
              value={deliveryForm.deliveryInstruction}
              onChange={handleDeliveryForm}
            />
            {/* </Segment> */}

            <Divider />
            <div style={{ float: 'right', marginBottom: 20 }}>
              <Button icon="close" style={{ backgroundColor: "#bcbbbd", color: "white" }}
                onClick={() => { setStep4bModal(false) }} />

              <Button style={{
                backgroundImage: 'linear-gradient(to top right, #7775fa, #9a99f0)',
                color: "white"
              }} onClick={() => {
                setStep3bModal(true)
                setStep4bModal(false)
              }}>
                <Icon name='arrow left' />Back
          </Button>

              <Button content='Submit'
                style={{
                  backgroundImage: 'linear-gradient(to top right, #7775fa, #9a99f0)',

                  color: "white"
                }}
                onClick={() => {
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

      {/* Step5b: delivery confirmation */}
      <Modal centered={false} open={step5bModal} dimmer='inverted' style={{ width: '90vw', maxWidth: 550, marginTop: 80 }}>
        <Modal.Header
          style={{
            backgroundImage: 'linear-gradient(to top right, #9991c9, #e5c1cd)',

            color: "white",
            marginBottom: 15
          }}>
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
                  <td>{deliveryForm.postalCode}</td>
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
              {deliveryForm.request ?
                <tr>
                  <td>Special request:</td>
                  <td>{deliveryForm.request}</td>
                </tr> : null
              }
            </table>
          </h4>
        </Modal.Content>
        <Modal.Actions>
          <Button icon="close" style={{ backgroundColor: "#bcbbbd", color: "white" }}
            onClick={() => { setStep5bModal(false) }} />

          <Button
            style={{
              backgroundImage: 'linear-gradient(to top right, #7775fa, #9a99f0)',
              color: "white"
            }}
            onClick={() => {
              setStep4bModal(true)
              setStep5bModal(false)
            }}>
            <Icon name='arrow left' />Back
          </Button>

          {!loading ?
            <Button style={{
              backgroundImage: 'linear-gradient(to top right, #7775fa, #9a99f0)',
              color: "white"
            }}
              onClick={() => {
                submitDeliveryOrder()
              }}>
              Confirm &nbsp; <Icon name='check' />
            </Button> :
            <Button style={{
              backgroundImage: 'linear-gradient(to top right, #7775fa, #9a99f0)',
              color: "white"
            }}
              loading onClick={() => {
              }}>Loading</Button>
          }
        </Modal.Actions>
      </Modal>

      <Modal open={confirmedModal}>
        <Segment basic placeholder>
          <Header icon>
            <Icon name="check circle outline" size="huge" color="green" />
            <h4>Thank you! Your order has been placed. <br />
          You can view your orders in your profile page.</h4>
          </Header>
          <Divider />
          <Button style={{
            backgroundImage: 'linear-gradient(to top right, #7775fa, #9a99f0)',
            color: "white"
          }}
            onClick={() => { setConfirmedModal(false) }}>OK</Button>
        </Segment>
      </Modal>
    </>
  )
}

export default CheckOutModal