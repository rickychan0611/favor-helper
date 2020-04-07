import React, { useEffect, useState } from 'react'
import db from '../../firestore'

import Question from '../Question'
import { Divider } from 'semantic-ui-react'

const QuestionsContainer = ({ post }) => {
  // const { questionsQuery, questions, setQuestions, loading } = React.useContext(QuestionsContext)
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState([])

  React.useEffect(
    () => {
      if (post) {
        let query = db.collection('questions').where('postId', '==', post.id)
        query.onSnapshot(snapshot => {
          const arr = []
            snapshot.forEach(doc => { arr.push(doc.data()) })
            arr.sort((a , b )=>{
              return a.createAt.toDate() - b.createAt.toDate()
            })
          setQuestions(arr)
        }
        )
      }
    },[post]
  )

  return (
    <div>
      <Divider horizontal>Questions for poster</Divider>
      {!loading ? questions.map((item, i) => {
        return <Question item={item} key={i} />
      })
        :
        "loading..."}
    </div>
  )
}

export default QuestionsContainer