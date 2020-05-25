import React, { useContext, useState } from 'react'
import styles from './styles'
import { Input, Form, Icon, Header, Checkbox, Dimmer, Container, Responsive, Button } from 'semantic-ui-react';
import firebase from 'firebase'
import { useHistory, useParams } from "react-router-dom";
import { PostsContext } from '../../context/PostsContext'
import { UserContext } from '../../context/UserContext'
import { FavButton, Map } from '../../components';
import { PhotoSlider } from '../../components'
import Step2 from './Step2'
import Step4 from './Step4'

const Step3 = ({ Steps, setSteps }) => {
  const { preview, setPreview, formState, setFormState, validationError, setValidationError, success, setSuccess, posts } = useContext(PostsContext)

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
  return (
    <>
      <h2>Step 3: <br />Pickup / Delivery</h2>
      <p>You can select both</p>
      <Checkbox
        label="Delivery: You will deliver to customers"
        onChange={deliveryToggle}
        checked={formState.delivery}
      />
      <br /><br />
      <Checkbox
        label="Pickup: Customers will pickup from your location"
        onChange={pickUpToggle}
        checked={formState.pickUp}
      />

      {formState.pickUp ?
        <>
          <h3 style={{ marginBottom: 0 }}>Enter the Pickup Address</h3><br />
          <Form>
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
              label='Delivery Instruction'
              placeholder="ex. Buzz number or enter from back door."
              name="deliveryInstruction"
              value={deliveryForm.deliveryInstruction}
              onChange={handleDeliveryForm}
            />
          </Form>
        </>
        : null}
      {/* <Map height={300} formState={formState} setFormState={setFormState} /> */}
      <div style={{
        position: 'absolute',
        top: 'auto',
        bottom: 50,
        left: 'auto',
        right: 45
      }}>
        <Button style={{ backgroundColor: "#bcbbbd", color: "white" }}
          onClick={() => { history.goBack() }}>
          <Icon name='close' />
        </Button>
        <FavButton clicked={() => { setSteps({ Step: Step2 }) }}> <Icon name='arrow left' />Back</FavButton>
        <FavButton clicked={() => { setSteps({ Step: Step4 }) }}> Next<Icon name='arrow right' /></FavButton>
      </div>
    </>
  )
}

export default Step3