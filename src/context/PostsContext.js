import React, { createContext } from 'react'
import db from '../firestore'

export const PostsContext = createContext()

const PostsContextProvider = ({ children }) => {
  const [posts, setPosts] = React.useState([])

  const [preview, setPreview] = React.useState(false)

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
          setPreview
        }
      }>
      {children}
    </PostsContext.Provider>
  )
}

export default PostsContextProvider

