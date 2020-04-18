import React, { useState, useEffect, useContext } from 'react'
import { Header, Segment, Comment, Form, Button, TextArea } from 'semantic-ui-react'
import db from '../../firestore'
import { QuestionReplies, Post, QuestionForm } from '../../components'
import { QuestionsContext } from '../../context/QuestionsContext'

import styles from './styles'

const QuestionRepliesContainer = ({ questionId, newReply }) => {
  // const { getReplies, replies } = useContext(QuestionsContext)
  const [replies, setReplies] = useState([])

  useEffect(() => {
    let arr = []
      db.collection('questionReplies').where('questionId', '==', questionId)
        .onSnapshot(querySnapshot => {
          querySnapshot.docChanges().forEach(change => {
            setReplies(replies => {
              let arr = [...replies, change.doc.data()]
              arr.sort((a, b) => {
                return a.createAt - b.createAt
              })
              return arr
            })
          })
        })
  }, [])

  return (
    <>
      {replies.map((item) => {
        return (
          <QuestionReplies item={item} key={item.id} />
        )
      })}
    </>
  )
}

export default QuestionRepliesContainer