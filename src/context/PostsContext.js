import React, { createContext, useState } from 'react'
import db from '../firestore'

export const PostsContext = createContext()

const PostsContextProvider = ({ children }) => {
  const [posts, setPosts] = useState([])
  const [preview, setPreview] = useState(false)
  const [formState, setFormState] = useState({
    title: "",
    price: 0
  })

  const submitPost = () => {
    const timeStamp = new Date()
    const createPost = db.collection('posts').doc()
    createPost.set(
      {...formState, createAt: timeStamp, id: createPost.id}
    ).then(function (doc) {
      // setUser(doc.data())
      // setLoading(false)
      console.log("Post Saved: ", doc.id);
    })
      .catch(function (error) {
        console.error("Error adding Post: ", error);
      })
    return
  }

  React.useEffect(
    () => {
      const unsubscribe =
        db.collection('posts')
          .orderBy('createAt', 'desc')
          .onSnapshot(snapshot => {
            const arr = []
            snapshot.forEach(doc => { arr.push(doc.data()) })
            setPosts(arr)
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
          submitPost
        }
      }>
      {children}
    </PostsContext.Provider>
  )
}

export default PostsContextProvider

