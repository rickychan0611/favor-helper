import React, { useState, useContext, useEffect } from 'react'
import { Grid, Button, Icon, Modal, Header, Segment, Divider, Popup, Checkbox } from 'semantic-ui-react'
import db from '../../firestore'
import { useHistory } from "react-router-dom";
import { UserContext } from '../../context/UserContext'
import { PostsContext } from '../../context/PostsContext'
import { Map, Loading, FormatDate, FavButton, SignInModal } from '../../components'
import moment from 'moment'

import AvatarImageCropper from 'react-avatar-image-cropper';
import firebase from 'firebase'
import styles from './styles'

const MySales = () => {
  const history = useHistory()
  const { user, loading, setUser, updateProfilePic } = useContext(UserContext)
  const [myOrders, setMyOrders] = useState([])
  const [thisloading, setLoading] = useState(true)
  const [noOrder, setNoOrder] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [modalIndex, setModalIndex] = useState(0)
  const [openSignInModal, setOpenSignInModal] = useState(false)
  const [status, setStatus] = useState('Unconfirmed')
  const [clearCheck, setClearCheck] = useState(false)

  useEffect(() => {
    if (user) {
      if (user == "not signed in") {
        setLoading(false)
        alert("Please login 1st 😅")
        history.push('/sign-in')
      }
      else {
        let orderArr = []
        // get orders
        db.collection('orders')
          // .orderBy('createAt', 'desc')
          .where('posterUid', '==', user.uid)
          .get()
          .then(snapshot => {

            snapshot.forEach(doc => {
              orderArr.push(doc.data())
            })

            orderArr.forEach((item, index) => {
              db.collection('users')
                .where('uid', '==', item.buyerUid)
                .get()
                .then(snapshot => {
                  snapshot.forEach(doc => {
                    orderArr[index].buyer = doc.data()
                    setMyOrders(orderArr)
                  })
                  setLoading(false)
                })
            })
          })
          .catch(err => {
            console.log('Error getting documents', err)
          })
      }
    }
  }, [user])

  const handleOpenModal = (item, index) => {
    setOpenModal(true)
    setModalIndex(index)
  }

  const MapModal = () => {
    let item = myOrders[modalIndex]
    return (
      <>
        {myOrders.length > 0 ?
          <Modal centered={false} open={openModal} dimmer='inverted' style={{ width: '90vw', maxWidth: 550, marginTop: 80 }}>
            <Modal.Header
              style={{
                backgroundImage: 'linear-gradient(to top right, #9991c9, #e5c1cd)',
                color: "white",
                marginBottom: 15
              }}>
              Pickup Address
          </Modal.Header>
            <Modal.Content>
              <Grid columns={2} stackable>
                <Grid.Column width={8}>
                  <Map style={{ marginTop: -10 }} height={300} width='100%' noSearchBar currentLocation={item.post.location} />
                </Grid.Column>
                <Grid.Column width={8}>
                  <Modal.Description>
                    <h4>Pick up address: </h4>
                    {item.pickupAddress ?
                      <>
                        {item.pickupAddress[0].long_name}&nbsp;{item.pickupAddress[1].long_name} <br />
                        {item.pickupAddress[2].long_name}<br />
                        {item.pickupAddress[3].long_name}<br />
                        {item.pickupAddress[4].long_name}<br />
                        {item.pickupAddress[5].long_name}<br />
                      </> : null}
                  </Modal.Description>
                </Grid.Column>
              </Grid>
            </Modal.Content>
            <Modal.Actions>
              <Button icon="close" content='Close' style={{ backgroundColor: "#bcbbbd", color: "white" }}
                onClick={() => { setOpenModal(false) }} />&nbsp;&nbsp;
              <a href={"https://www.google.com/maps/dir/?api=1&destination=" +
                item.pickupAddress[0].long_name + "+" +
                item.pickupAddress[1].long_name + "+" +
                item.pickupAddress[2].long_name + "+" +
                item.pickupAddress[3].long_name + "+" +
                item.pickupAddress[4].long_name + "+" +
                item.pickupAddress[5].long_name
              } target="_blank">
                <FavButton><Icon name="map marker alternate" />Get Direction</FavButton>
              </a>
            </Modal.Actions>
          </Modal>
          : null}
      </>
    )
  }

  return (
    <div style={{ padding: 14, height: '100vh' }}>
      {/* <MapModal myOrders={myOrders} /> */}
      <h1>My Sales</h1>
      {thisloading ?
        <Loading />
        :
        noOrder ? <h4>You don't have any sales yet.</h4> :
          <>
            <Grid stackable columns={3}>
              {myOrders.map((item, index) => {
                return (
                  <>
                    <Grid.Column>
                      <div style={{
                        backgroundImage: 'linear-gradient(to top right, #9991c9, #e5c1cd)',
                        color: "white", height: 60,
                        borderRadius: '5px 5px 0px 0px',
                        textAlign: 'center',
                        paddingTop: 4,
                      }}>
                        <h3>{item.shippingMethod}: &nbsp;
                     {item.deliveryDate ?
                            <FormatDate date={item.deliveryDate} /> :
                            <FormatDate date={item.pickupDate} />}
                          <br />
                            Status: {status}
                        </h3>
                      </div>
                      <Segment raised style={{ marginTop: 0 }}>

                        <div style={{backgroundColor: "white", padding: 10}}>
                          <h5 style={{marginBottom: 5}}>Buyer is waiting for confirmation</h5>
                          <Checkbox label={"Confirm " + item.shippingMethod + " date"}
                            onClick={() => {
                              if (status == 'Unconfirmed') {
                                setStatus('Confirmed')
                              }
                              else {
                                setStatus('Unconfirmed')
                                setClearCheck(false)
                              }
                            }} /><br/>
                          <Checkbox label={"Order is ready for " + item.shippingMethod}
                            disabled={status == "Unconfirmed"}
                            checked={clearCheck}
                            onClick={() => {
                              if (status == 'Confirmed') {
                                setStatus('Ready')
                                setClearCheck(true)
                              }
                              if (status == 'Ready') {
                                setStatus('Confirmed')
                                setClearCheck(false)
                              }
                            }} />
                        </div>

                        <Divider />
                        <table style={{ width: '100%' }}>
                          <tr>
                            <td>Order#: {item.id.slice(0, 4).toUpperCase()}</td>
                            <td style={{ textAlign: "right" }}>
                              {item.createAt.toDate().toLocaleString(
                                'en-US',
                                {
                                  month: 'long',
                                  day: 'numeric',
                                  year: 'numeric'
                                }
                              )}
                            </td>
                          </tr>
                        </table>
                        <Grid columns={3}>
                          <Grid.Column width={4}>
                            <img src={item.post.images[0].src} style={{ objectFit: "cover", height: 60, width: 60 }} />
                          </Grid.Column>
                          <Grid.Column width={9}>
                            <h3 style={{ margin: 0 }}>{item.post.title}</h3>
                            <h5 style={{ margin: 0 }}>Qty: {item.qty}<br />
                             Total: ${item.qty * item.post.price}</h5>
                            <span style={{ color: "green" }}>
                              {item.status}<br />
                              {item.shippingMethod === "Pick-up" ?
                                <span onClick={() => {
                                  handleOpenModal(item, index)
                                }}>Click to see address</span> : null}
                            </span>
                          </Grid.Column>
                        </Grid>
                        <table style={{ width: '100%' }}>
                          <tr>
                            <td>Buyer:</td>
                            <td>{item.deliveryForm.firstName + ' ' + item.deliveryForm.lastName} </td>
                            <td style={{ textAlign: "right", padding: 0 }}>
                              <Popup
                                pinned
                                position='top right'
                                content={'Message buyer'}
                                trigger={<Icon style={{ color: '#9991c9' }} size="large" name="talk" />}
                              />

                            </td>
                          </tr>
                          <tr>
                            <td>Phone #:</td>
                            <td colspan="2">{item.deliveryForm.phoneNumber}</td>
                          </tr>
                          <tr>
                            <td>Address:</td>
                            <td colspan="2">{item.deliveryForm.address1}</td>
                          </tr>
                          {item.deliveryForm.address2 ? <tr>
                            <td> </td>
                            <td colspan="2"> {item.deliveryForm.address2} </td>
                          </tr> : null}
                          <tr>
                            <td> </td>
                            <td colspan="2">{item.deliveryForm.city + ', ' + item.deliveryForm.province}</td>
                          </tr>
                          <tr>
                            <td>{item.shippingMethod}:</td>
                            <td colspan="2">{item.deliveryDate ?
                              <FormatDate date={item.deliveryDate} /> :
                              <FormatDate date={item.pickupDate} />}</td>
                          </tr>
                          <tr>
                            <td>Request:</td>
                            <td colspan="2">{item.deliveryForm.request}</td>
                          </tr>
                        </table>
                        {/* <Divider horizontal>Inform buyer</Divider> */}

                      </Segment>
                    </Grid.Column>
                  </>
                )
              })
              }
            </Grid>
          </>
      }
    </div>
  )
}

export default MySales