import React, { useState, useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { SignInModal } from '../../components'
import {
  Button,
  Header,
  Segment,
  Icon,
} from 'semantic-ui-react'

import CheckOutModal from '../CheckOutModal';

const PriceTimeColumn = ({ post, poster }) => {
  const { user } = useContext(UserContext)
  const [openSignInModal, setOpenSignInModal] = useState(false)
  const [state, setState] = useState()
  const [openModal, setOpenModal] = useState(false)
  const handlePriceChange = (e) => {
    setState(e.target.value)
    // setFormState({ ...formState, price: e.target.value })
  }

  return (
    <>
      <SignInModal openSignInModal={openSignInModal} setOpenSignInModal={setOpenSignInModal} />

      <CheckOutModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        post={post}
        poster={poster}
      />
      <Segment >
        <Segment>
          <Header as='h1'>Price:  ${post.price} </Header>

        </Segment>

        {/* <Divider fluid />

        <Header style={{ margin: 0 }}>Minimum Order: </Header>
        {post.minOrder}
        <Divider fluid />

        <Header style={{ margin: 0 }}>Maximum Order: </Header>
        {post.maxOrder}
        <Divider fluid />

        <Header style={{ margin: 0 }}>Order Cut-off Time: </Header>
        {post.CutOffTime}
        <Divider fluid /> */}

        {/* <Header style={{ margin: 0 }}>Completion Date: </Header>
        {post.completionDate}
        <Divider fluid /> */}
        <Segment>
          <h4 style={{ marginBottom: 5 }}>Shipping Method:</h4>
          {post.pickUp ?
            <><Icon name="check" color="green" />
              <span style={{ fontSize: 16 }}>Self Pick-up
              </span>&nbsp;&nbsp;&nbsp; </> : null}
          {post.delivery ?
            <><Icon name="check" color="green" />
              <span style={{ fontSize: 16 }}>
                Delivery {": " + post.deliveryFee === "0" ? "Free" : "$" + post.deliveryFee}
              </span></> : null}
        </Segment>

        {/* <Header style={{ margin: 0 }}>instructions: </Header>
        {post.pickUpGuide} */}

        <Button fluid
          style={{
            backgroundImage: 'linear-gradient(to top right, #7775fa, #9a99f0)',
            color: "white"
          }}
          size='big' onClick={() => {
            if (user == "not signed in") {
              setOpenSignInModal(true)
            }
            else {
              setOpenModal(true)
            }
          }}>
          Request Meal
          </Button>

      </Segment >
    </>
  )
}

export default PriceTimeColumn