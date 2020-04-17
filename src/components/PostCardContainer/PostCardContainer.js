import React, { useEffect, useState, useContext } from 'react'
import db from '../../firestore'
import firebase from 'firebase'
import { Rating, Divider, Icon } from 'semantic-ui-react'
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

const PostCardContainer = ({ item }) => {
  // const {  } = useContext(PostsContext)
  const [posterData, setPosterData] = useState({})
  const history = useHistory()
  let { path, url } = useRouteMatch();

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
      <div style={styles.container} onClick={() => {
        history.push("details/" + item.id + '/' + item.title.split(' ').join('-'))
      }}>

        <img src={item.images.length > 0 ? item.images[0].src : noImage}
          style={styles.foodPic} />

        <div style={styles.photoURLContainer}>
          <img src={posterData.photoURL} style={styles.photoURL} />
        </div>

        <div style={styles.favesContainer}>
          <Icon name="heart outline" size='large' />
        </div>

        <div style={styles.priceContainer}>
          <h3>${item.price}</h3>
        </div>

        <div style={styles.displayName}>
          <p>{posterData.displayName} <br />
            <Rating defaultRating={4} maxRating={5} icon='star' size='mini' disabled /> ({4})
          </p>
        </div>

        <div style={styles.details}>
          <h3 style={styles.title}>{item.title}</h3>
          <Divider fitted />
          <div style={styles.addressContainer}>
            <p style={styles.address}>{item.address[2].long_name}</p>
            <p style={styles.pickup}>
              {item.pickUp ? <Icon name="shopping bag" /> : null}
              {item.delivery ? <> &nbsp;&nbsp;<Icon name="shipping fast" />  </> : null}
            </p>
          </div>
          {/* clear right float css */}
          <div style={{ clear: "both" }}></div>
          <Divider fitted />

          {/* <Divider fitted /> */}
          <div style={styles.addressContainer}>
            <p style={styles.address}>Qty left : {item.minOrder ? <>{item.minOrder}</> : <>no limit</>} </p>
            <p style={styles.pickup}>Total Qty : {item.maxOrder ? <>{item.maxOrder}</> : <>no limit</>}
            </p>
          </div>
          <div style={{ clear: "both" }}></div>

          <Divider fitted />
          <p style={styles.dates}>{item.CutOffTime ? <>Group Buy: {item.minOrder} more orders to be valid. </> : <>Group Buy: N/A</>}<br />
          </p>

          <Divider fitted />
          <p style={styles.dates}>{item.CutOffTime ? <>Booking ends: {item.CutOffTime}</> : <>No booking nessessary</>}<br />
          Meal will be ready on: {item.completionDate ? <>{item.completionDate}</> : <>everyday</>}</p>
        </div>


      </div>
    </>
  )
}

export default PostCardContainer