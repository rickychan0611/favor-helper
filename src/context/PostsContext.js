import React, { createContext, useState, useEffect } from 'react'
import db from '../firestore'
import { useHistory } from "react-router-dom";

export const PostsContext = createContext()

const PostsContextProvider = ({ children }) => {
  const history = useHistory()

  const [posts, setPosts] = useState([])
  const [preview, setPreview] = useState(false)
  const [success, setSuccess] = useState(false)
  const [validationError, setValidationError] = useState(false)
  const [formState, setFormState] = useState({
    title: "",
    price: "",
    address: "",
    pickup: false,
    delivery: false,
    aboutMe: "",
    pickupWeeks: [
      { day: 'Mon', active: true },
      { day: 'Tue', active: true },
      { day: 'Wed', active: true },
      { day: 'Thu', active: true },
      { day: 'Fri', active: true },
      { day: 'Sat', active: true },
      { day: 'Sun', active: true }
    ],
    deliveryWeeks: [
        { day: 'Mon', active: true },
        { day: 'Tue', active: true },
        { day: 'Wed', active: true },
        { day: 'Thu', active: true },
        { day: 'Fri', active: true },
        { day: 'Sat', active: true },
        { day: 'Sun', active: true }
    ],
    delivery1Km : 0,
    pickupStartTime : new Date().setHours(8,0,0,0),
    pickupEndTime : new Date().setHours(21,0,0,0),
    deliveryStartTime : new Date().setHours(8,0,0,0),
    deliveryEndTime : new Date().setHours(21,0,0,0),

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
    if (formState.id) {
      console.log('formState' + JSON.stringify(formState))
      db.collection('posts').doc(formState.id).update(formState)
      .then(doc => {
        console.log("Post updated!");
        history.push('/profile')
        localStorage.removeItem('newPost')
        setFormState({
          title: "",
          price: "",
          pickup: false,
          delivery: false,
          location: ""
        })
      })
    }
    if (!formState.id) {
      const timeStamp = new Date()
      const createPost = db.collection('posts').doc()
      console.log('formState' + JSON.stringify(formState))

        createPost.set(
          { ...formState, createAt: timeStamp, id: createPost.id }
        ).then(doc => {
          setSuccess(true)
          console.log("Post Saved: ");
          setFormState({
            title: "",
            price: "",
            address: "",
            pickup: false,
            delivery: false
          })
        })
          .catch(function (error) {
            console.error("Error adding Post: ", error);
          })
        return
    }
  }

  const updatePostToServer = () => {
    const timeStamp = new Date()
    const createPost = db.collection('posts').doc()
    if (validation()) {

      createPost.update(
        { ...formState, createAt: timeStamp }
      ).then(doc => {
        setSuccess(true)
        console.log("Post Saved: ");
      })
        .catch(function (error) {
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
          setSuccess
        }
      }>
      {children}
    </PostsContext.Provider>
  )
}

export default PostsContextProvider

