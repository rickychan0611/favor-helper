import React, { useEffect, useState } from 'react'
import db from '../../firestore'
import firebase from 'firebase'
// import {
// } from 'semantic-ui-react'
import styles from './styles'

import noImage from '../../assets/images/no-image.jpg'

const PostCardContainer = ({ item }) => {
  const [posterPic, SetPosterPic] = useState('')

  // const getPosterPic = () => {
  //   let storage = firebase.storage()
  //   let urlRef = storage.ref('userPic/' + item.posterUid)
  //   urlRef.getDownloadURL().then(function (downloadURL) {
  //     // item.refundImg = downloadURL
  //     return downloadURL
  //   })
  //     .then((downloadURL) => {
  //       updateProfilePic(downloadURL)
  //       return
  //     })
  // }
  
  useEffect(()=>{
    // getPosterPic()
  },[])

  return (
    <div style={styles.container}>
      <img src={item.images.length > 0 ? item.images[0].src : noImage}
        style={styles.img} />
      <img src={posterPic} style={styles.posterPic}/>
    </div>
  )
}

export default PostCardContainer