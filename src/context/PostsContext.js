import React, { createContext } from 'react'
import db from '../firestore'

export const PostsContext = createContext()

const PostsContextProvider = ({ children }) => {
  const [posts, setPosts] = React.useState([])

  React.useEffect(
    () => {
      const unsubscribe = 
        db.collection('posts')
        .onSnapshot( snapshot => { 
          const arr = [] 
          snapshot.forEach(doc => { arr.push(doc.data()) }) 
          setPosts(arr)
          console.log(arr)
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
          posts        }
      }>
      {children}
    </PostsContext.Provider>
  )
}

export default PostsContextProvider

