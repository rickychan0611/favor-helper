import React, { useEffect, useState, useContext } from 'react'
import db from '../../firestore'
import firebase from 'firebase'
import { Rating, Divider, Icon, Button } from 'semantic-ui-react'
import styles from './styles'
import {
  Link,
  Route,
  Switch,
  useRouteMatch,
  useHistory,
  Redirect
} from "react-router-dom"
import noImage from '../../assets/images/no-image.jpg'
import { PostsContext } from '../../context/PostsContext'

const PostCard = ({ item, edit }) => {
  // const {  } = useContext(PostsContext)
  const history = useHistory()
  let { path, url } = useRouteMatch();

  const [posterData, setPosterData] = useState({})
  const { setFormState } = useContext(PostsContext)
  const getPosterData = () => {
    db.collection('users').where('uid', '==', item.posterUid).get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          console.log(JSON.stringify(doc.data()))
          setPosterData(doc.data())
        })
      }
      )
  }

  useEffect(() => {
    getPosterData()
  }, [])

  return (
    <>
      {edit ?
        <div>
          <Button color="blue"
            onClick={() => {
              setFormState(item)
              history.push('/edit/' + item.id)
            }
            }>
            Edit
          </Button>
          <Button>Delete</Button></div>
        : null}
      <div style={styles.container}>
        
      <div style={styles.photoURLContainer}>
            <img src={posterData.photoURL} style={styles.photoURL}
              onClick={() => {
                history.push('/user/' + posterData.posterUid)
              }} />
          </div>
          <div style={styles.displayName}>
            <p>{posterData.displayName} <br />
              <Rating defaultRating={4} maxRating={5} icon='star' size='mini' disabled /> ({4})
          </p>
          </div>

          
        <div
          onClick={() => {
            history.push("details/" + item.id + '/' + item.title.split(' ').join('-'))
          }}>
          <img src={item.images.length > 0 ? item.images[0].src : noImage}
            style={styles.foodPic} />

          <div style={styles.favesContainer}>
            <Icon name="heart outline" size='large' />
          </div>

          <div style={styles.priceContainer}>
            <h3>${item.price}</h3>
          </div>

           <div style={styles.details}>
            <h3 style={styles.title}>{item.title}</h3>
            <Divider fitted />
            <div style={styles.addressContainer}>
              {!item.pickupAddress ? null :
              <p style={styles.address}>Location: {item.pickupAddress.city}</p>}
              <p style={styles.pickup}>
                {item.pickUp ? <Icon name="shopping bag" /> : null}
                {item.delivery ? <> &nbsp;&nbsp;<Icon name="shipping fast" />  </> : null}
              </p>
            </div>
            {/* clear right float css */}
            <div style={{ clear: "both" }}></div>
            <Divider fitted />

            {/* <Divider fitted /> */}
            {/* <div style={styles.addressContainer}>
              <p style={styles.address}>Qty left : {item.minOrder ? <>{item.minOrder}</> : <>no limit</>} </p>
              <p style={styles.pickup}>Total Qty : {item.maxOrder ? <>{item.maxOrder}</> : <>no limit</>}
              </p>
            </div>
            <div style={{ clear: "both" }}></div> */}

            {/* <Divider fitted />
            <p style={styles.dates}>{item.CutOffTime ? <>Group Buy: {item.minOrder} more orders to be valid. </> : <>Group Buy: N/A</>}<br />
            </p> */}

            {/* <Divider fitted />
            <p style={styles.dates}>{item.CutOffTime ? <>Booking ends: {item.CutOffTime}</> : <>No booking nessessary</>}<br />
          Meal will be ready on: {item.completionDate ? <>{item.completionDate}</> : <>everyday</>}</p> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default PostCard