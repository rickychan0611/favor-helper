import React, { useContext, useState, useEffect } from 'react'
import styles from './styles'
import { Input, Form, Icon, Modal, Checkbox, Button } from 'semantic-ui-react';
import firebase from 'firebase'
import { useHistory, useParams } from "react-router-dom";
import { PostsContext } from '../../context/PostsContext'
import { UserContext } from '../../context/UserContext'
import { FavButton, Map } from '../../components';
import { PhotoSlider } from '../../components'
import Step2 from './Step2'
import Step4 from './Step4'
import './styles.css'
import db from '../../firestore'
import _ from 'lodash';

const Step3 = ({ Steps, setSteps }) => {
  const { preview, setPreview, formState, setFormState, validationError, setValidationError, success, setSuccess, posts } = useContext(PostsContext)
  const { user, setUser } = useContext(UserContext)
  const [loading, setLoading] = useState(false)

  const handleChange = (e, { name, value }) => {
    setFormState({ ...formState, [name]: value })
  }
  const history = useHistory()

  const pickUpToggle = () => {
    setFormState(({ ...formState, pickUp: !formState.pickUp }))
  }

  const deliveryToggle = () => {
    setFormState(({ ...formState, delivery: !formState.delivery }))
  }

  const [deliveryForm, setDeliveryForm] = useState({})

  const handleDeliveryForm = (e, { value, name }) => {
    setDeliveryForm({ ...deliveryForm, [name]: value })
  }

  const clearField = (name) => {
    setDeliveryForm({ [name]: '' })
  }

  const handleSubmit = () => {
    if (formState.pickUp) {
      setFormState({...formState, pickUpAddress: deliveryForm})

      if (_.isEqual(user.address, deliveryForm)) {
        setSteps({ Step: Step4 })
      } else {
        setOpen(true)
      }
    } else {
      setSteps({ Step: Step4 })
      setFormState({...formState, pickUpAddress: deliveryForm})
    }
  }

  const saveAddressModal = () => {
    // console.log(JSON.stringify('hello'))
    setLoading(true)
    console.log(JSON.stringify(deliveryForm))
    db.collection('users').doc(user.id).update(
      { address: deliveryForm }
    ).then(() => {
      setLoading(false)
      setSteps({ Step: Step4 })
    })
  }

  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (user) {
      if (user.address) {
        setDeliveryForm(user.address)
      }
    }
  }, [user])

  return (
    <>
      <Modal
        open={open}
        dimmer='inverted'
      >
        <Modal.Content>
          <h3>Do you want to set as your default address?</h3>
        </Modal.Content>
        <Modal.Actions>

          <Button style={{ backgroundColor: "#bcbbbd", color: "white" }}
            onClick={() => setSteps({ Step: Step4 })} >
            <Icon name='close' /> No
          </Button>
          <FavButton
            clicked={() => saveAddressModal()} >
            {loading ?
              <Icon loading name='spinner' /> :
              <><Icon name='checkmark' /> Yes</>}
          </FavButton>
        </Modal.Actions>
      </Modal>

      <h2>Step 3 of 5: <br />Pickup / Delivery</h2>
      <p>You can select both</p>
      <Checkbox
        label="Delivery: You will deliver to customers"
        onChange={deliveryToggle}
        checked={formState.delivery}
      />
      {formState.delivery ?
        <>
          <h4>Delivery fee?<span> (within 5km) </span></h4>
          <Input
            className="deliveryFee"
            type="number"
            lable="within 1km radius"
            value={formState.delivery1Km}
            onChange={(e) => { setFormState({ ...formState, delivery1Km: e.value }) }}
            icon="dollar"
            iconPosition="left"
            size="small"
          />
        </> : null
      }
      <br /><br />
      <Checkbox
        label="Pickup: Customers will pickup from your location"
        onChange={pickUpToggle}
        checked={formState.pickUp}
      />
      <Form onSubmit={handleSubmit}>

        {formState.pickUp ?
          <>
            <h3 style={{ marginBottom: 0 }}>Enter the Pickup Address</h3><br />
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
            <Form.Input
              required
              fluid
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
            <Form.Input
              required
              label='Phone Number'
              name="phoneNumber"
              value={deliveryForm.phoneNumber}
              onChange={handleDeliveryForm}
              icon={<Icon name='close' link onClick={() => { clearField("phoneNumber") }} />}
            />
            <Form.TextArea
              label='Pickup Instruction'
              placeholder="ex. Buzz number or enter from back door."
              name="PickupInstruction"
              value={deliveryForm.PickupInstruction}
              onChange={handleDeliveryForm}
            />
          </>
          : null}
        {/* <Map height={300} formState={formState} setFormState={setFormState} /> */}
        <div style={{
          position: 'relative',
          width: '100%'
        }}
        >
          <div style={{
            marginTop: 30,
            position: 'absolute',
            left: 'auto',
            right: 0
          }}>
            <Button style={{ backgroundColor: "#bcbbbd", color: "white" }}
              onClick={() => { history.goBack() }} icon>
              <Icon name='close' />
            </Button>
            <FavButton clicked={() => { setSteps({ Step: Step2 }) }}> <Icon name='arrow left' />Back</FavButton>
            <FavButton disable={!formState.delivery && !formState.pickUp ? true : false}
              content="Submit"
              clicked={() => {
              }}> Next<Icon name='arrow right' />
            </FavButton>
          </div>
        </div>
      </Form>

    </>
  )
}

export default Step3