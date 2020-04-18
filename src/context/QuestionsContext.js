import React, { createContext, useState } from 'react'
import db from '../firestore'
import { PostsContext } from './PostsContext'

export const QuestionsContext = createContext()

const QuestionsContextProvider = ({ children }) => {

  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [poster, setPoster] = useState({})
  const [replies, setReplies] = useState([])
  // const {post} = React.useContext(PostsContext)

  const questionsQuery = (props) => {
    setLoading(true)
    setQuestions([]) 
  }

  const getPoster = (posterId) => {
    db.collection('users').where('uid', '==', posterId).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        console.log(JSON.stringify(doc.data()))
        setPoster(doc.data())
      })
    }
  )
  }
  
  // const getReplies = (questionId) => {
  //   db.collection('questionReplies').where('questionId', '==', questionId).get()
  //   .then(snapshot => {
  //     snapshot.forEach(doc => {
  //       const arr = [...replies.slice(0,replies.length-1), doc.data()]
  //       // arr.push(doc.data())
  //       setReplies(arr)
  //     })
  //   })
  // }

  return (
    <QuestionsContext.Provider
      value={
        {
          questionsQuery,
          questions,
          loading,
          getPoster,
          poster,
        }
      }>
      {children}
    </QuestionsContext.Provider>
  )
}

export default QuestionsContextProvider