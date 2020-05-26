import React, { useContext, useState, useEffect } from 'react'
import styles from './styles'
import { Input, Form, Icon, Header, Checkbox, Dimmer, Container, Responsive, Button, Divider } from 'semantic-ui-react';
import firebase from 'firebase'
import { useHistory, useParams } from "react-router-dom";
import { PostsContext } from '../../context/PostsContext'
import { UserContext } from '../../context/UserContext'
import { FavButton, Map } from '../../components';
import { PhotoSlider } from '../../components'
import Step3 from './Step3'
import DatePicker from "react-datepicker"
import './styles.css'

const Step4 = ({ Steps, setSteps }) => {
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

  const onUpdateItem = (i) => {
    const state = formState.pickupWeeks.map((item, j) => {
      if (j === i) {
        item.active = !formState.pickupWeeks[i].active
        return item
      } else {
        return item
      }
    })
    // return state
    setFormState({
      ...formState, pickupWeeks: state
    })
  }

  const setPickupStartDate = () => {

  }

  return (
    <>
      <h2>Step 4: <br />Set Available Days</h2>
      <Divider horizontal>Pick up</Divider>
      <h4>Select Available Pickup Days: <span style={{ fontSize: 13 }}>(Green = available)</span> <br />
        {formState.pickupWeeks.map((item, i) => {
          return (
            <Button
              compact size="mini"
              color={item.active ? "green" : "grey"}
              style={{ margin: 4 }}
              onClick={() => {
                onUpdateItem(i)
              }}
            >{item.day}
            </Button>
          )
        })}
      </h4>
      <h4>Available Pickup Hours:</h4>
      <span>From: &nbsp;
        <DatePicker
        className="time"
        selected={formState.pickupStartTime}
        onChange={date => setFormState({
          ...formState, pickupStartTime: date
        })}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="h:mm aa"
      />
      &nbsp;&nbsp;to&nbsp;&nbsp;
      <DatePicker
        className="time"
        selected={formState.pickupEndTime}
        onChange={date => setFormState({
          ...formState, pickupEndTime: date
        })}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="h:mm aa"
      />
      </span>
      <br/>
      <br/>

      <Divider horizontal>Delivery</Divider>
      <h4>Select Available Delivery Days: <span style={{ fontSize: 13 }}>(Green = available)</span> <br />
        {formState.deliveryWeeks.map((item, i) => {
          return (
            <Button
              compact size="mini"
              color={item.active ? "green" : "grey"}
              style={{ margin: 4 }}
              onClick={() => {
                onUpdateItem(i)
              }}
            >{item.day}
            </Button>
          )
        })}
      </h4>
      <h4>Available Delivery Hours:</h4>
      <span>From: &nbsp;
        <DatePicker
        className="time"
        selected={formState.deliveryStartTime}
        onChange={date => setFormState({
          ...formState, deliveryStartTime: date
        })}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="h:mm aa"
      />
      &nbsp;&nbsp;to&nbsp;&nbsp;
      <DatePicker
        className="time"
        selected={formState.deliveryEndTime}
        onChange={date => setFormState({
          ...formState, deliveryEndTime: date
        })}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="h:mm aa"
      />
      </span>


      <div style={{
        position: 'absolute',
        top: 'auto',
        bottom: 50,
        left: 'auto',
        right: 45
      }}>

        <Button style={{ backgroundColor: "#bcbbbd", color: "white" }}
          onClick={() => { history.goBack() }} icon>
          <Icon name='close' />
        </Button>
        <FavButton clicked={() => {
          setSteps({ Step: Step3 })
        }}> <Icon name='arrow left' />Back</FavButton>
        <FavButton clicked={() => { setSteps({ Step: Step3 }) }}> Next<Icon name='arrow right' /></FavButton>
      </div>
    </>
  )
}

export default Step4