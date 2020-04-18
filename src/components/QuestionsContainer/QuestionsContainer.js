import React, { useEffect, useState } from 'react'
import db from '../../firestore'
import { QuestionForm } from '../../components'
import Question from '../Question'
import { Header, Segment, Comment, Form, Button } from 'semantic-ui-react'

const QuestionsContainer = ({ post, user }) => {
  // const { questionsQuery, questions, setQuestions, loading } = React.useContext(QuestionsContext)
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState([])
  const [questioners, setQuestioners] = useState([])

  React.useEffect(
    () => {
      if (post.id) {
        let query = db.collection('questions').where('postId', '==', post.id)
        query.onSnapshot(snapshot => {
          const arr = []
          snapshot.forEach(doc => { 
            arr.push(doc.data()) 
          })
          arr.sort((a, b) => {
            return a.createAt.toDate() - b.createAt.toDate()
          })
          setQuestions(arr)
        }
        )
      }
    }, [post]
  )

  return (
    <>
      <Header>Questions for this meal</Header>
      {!loading ?
        <>
          <Segment>

            <Comment.Group>
              {questions.map((item, i) => {
                return <Question item={item} key={i} />
              })}
              <QuestionForm user={user}/>

            </Comment.Group>
            
          </Segment>
        </>
        :
        "loading..."
      }
    </>
  )
}

export default QuestionsContainer