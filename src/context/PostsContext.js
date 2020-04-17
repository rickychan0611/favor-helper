import React, { createContext, useState, useEffect } from 'react'
import db from '../firestore'

export const PostsContext = createContext()

const PostsContextProvider = ({ children }) => {
  const [posts, setPosts] = useState([])
  const [preview, setPreview] = useState(false)
  const [success, setSuccess] = useState(false)
  const [validationError, setValidationError] = useState(false)
  const [formState, setFormState] = useState({
    title: "",
    price: "",
    address: "",
    pickup: false,
    delivery: false
  })

  const { title, price, pickUp, delivery, address } = formState

  const validation = () => {
    if (title === "" || price === "" || address === "") {
      return false
    }
    else if (pickUp === true || delivery === true) {
      return true
    }
    else return false
  }

  const submitPostToServer = () => {
    const timeStamp = new Date()
    const createPost = db.collection('posts').doc()
    if (validation()) {

      createPost.set(
        { ...formState, createAt: timeStamp, id: createPost.id }
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
      let postArr = []

      const unsubscribe =
        db.collection('posts')
          .orderBy('createAt', 'desc')
          .onSnapshot(snapshot => {
            snapshot.forEach(doc => {
              postArr.push(doc.data())
            })
            setPosts(postArr)
          }
        )
      return () => unsubscribe()
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

