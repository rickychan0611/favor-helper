import React, { createContext, useState, useEffect, useContext } from 'react'
import db from '../firestore'
import { useHistory } from "react-router-dom";
import { UserContext } from './UserContext'
import useStateWithCallback from 'use-state-with-callback';
import addImage from '../assets/images/add-image.jpg'

export const PostsContext = createContext()

const PostsContextProvider = ({ children }) => {
  const history = useHistory()
  const { user, setUser } = useContext(UserContext)
  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useState([])
  const [preview, setPreview] = useState(false)
  const [success, setSuccess] = useState(false)
  const [validationError, setValidationError] = useState(false)
  const pickupWeeks = [
    { day: 'Sun', active: true },
    { day: 'Mon', active: true },
    { day: 'Tue', active: true },
    { day: 'Wed', active: true },
    { day: 'Thu', active: true },
    { day: 'Fri', active: true },
    { day: 'Sat', active: true },
  ]
  const deliveryWeeks = [
    { day: 'Sun', active: true },
    { day: 'Mon', active: true },
    { day: 'Tue', active: true },
    { day: 'Wed', active: true },
    { day: 'Thu', active: true },
    { day: 'Fri', active: true },
    { day: 'Sat', active: true },
  ]
  let d = new Date()
  let startTime = d.setHours(8)
  startTime = d.setMinutes(0)
  let endTime = d.setHours(21)
  endTime = d.setMinutes(0)
  const [formState, setFormState] = useState({
    title: "",
    price: "",
    address: "",
    pickUp: false,
    delivery: false,
    aboutMe: "",
    pickupWeeks,
    deliveryWeeks,
    deliveryFee: 0,
    pickupStartTime: startTime,
    pickupEndTime: endTime,
    deliveryStartTime: startTime,
    deliveryEndTime: endTime,
    image: [{src: addImage}]
  })

  const { title, price, pickUp, delivery, address, summary } = formState

  const validation = () => {
    if (title === "" || price === "" || address === "" || summary === "") {
      return false
    }
    else if (pickUp === true || delivery === true) {
      return true
    }
    else return false
  }

  const submitPostToServer = () => {
    setLoading(true)
    if (formState.id) {
      console.log('formState' + JSON.stringify(formState))
      db.collection('posts').doc(formState.id).update(formState)
        .then(doc => {
          console.log("Post updated!");
          setLoading(false)
          history.push('/my-posts')
          localStorage.removeItem('newPost')
          localStorage.removeItem('Images')
          setFormState({
            title: "",
            price: "",
            pickUp: false,
            delivery: false,
            location: "",
            pickupWeeks,
            deliveryWeeks,
            startTime,
            endTime
          })
        })
    }
    if (!formState.id) {
      const timeStamp = new Date()
      const createPost = db.collection('posts').doc()
      console.log('formState' + JSON.stringify(formState))

      createPost.set(
        {
          ...formState,
          createAt: timeStamp,
          id: createPost.id,
          posterUid: user.uid
        }
      ).then(doc => {
        setSuccess(true)
        setLoading(false)
        console.log("Post Saved: ");
        history.push('/my-posts')
        localStorage.removeItem('newPost')
        localStorage.removeItem('Images')
        setFormState({
          title: "",
          price: "",
          address: "",
          pickUp: false,
          delivery: false,
          pickupWeeks,
          deliveryWeeks
        })
      })
        .catch(function (error) {
          setLoading(false)
          console.error("Error adding Post: ", error);
        })
      return
    }
  }

  const updatePostToServer = () => {
    const timeStamp = new Date()
    setLoading(true)
    const createPost = db.collection('posts').doc()
    if (validation()) {

      createPost.update(
        { ...formState, createAt: timeStamp }
      ).then(doc => {
        setSuccess(true)
        setLoading(false)
        console.log("Post Saved: ");
      })
        .catch(function (error) {
          setLoading(false)
          console.error("Error adding Post: ", error);
        })
      return
    }
    else {
      setValidationError(true)
    }
  }

  //get all posts
  useEffect(
    () => {
      db.collection('posts')
        .orderBy('createAt', 'desc')
        .onSnapshot(snapshot => {
          let postArr = []
          setPosts([])
          snapshot.forEach(doc => {
            postArr.push(doc.data())
          })
          setPosts(postArr)
        }
        )
    },
    []
  )


  return (
    <PostsContext.Provider
      value={
        {
          posts,
          preview,
          setPreview,
          formState,
          setFormState,
          submitPostToServer,
          validationError,
          setValidationError,
          success,
          setSuccess,
          loading,
          setLoading,
          pickupWeeks,
          deliveryWeeks
        }
      }>
      {children}
    </PostsContext.Provider>
  )
}

export default PostsContextProvider

