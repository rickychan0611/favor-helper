import React, { useState, useEffect } from 'react'
import db from '../../firestore'
import { UserContext } from '../../context/UserContext'

import {
  Container,
  Button,
  Dimmer,
  Loader,
  Form,
  Grid,
  Image,
  Divider,
  Segment,
} from 'semantic-ui-react'
import { QuestionsContainer } from '../../components/';
import {
  useParams, useRouteMatch, useHistory
} from "react-router-dom";
import styles from './styles'


const QuestionForm = ({replyQuestion}) => {
  const { user } = React.useContext(UserContext)
  let history = useHistory()
  let { id } = useParams();
  const [question, setQuestion] = useState('')

  const handleQuestionChange = (e, { value }) => {
    setQuestion(value)
    console.log('value' + question)
  }

  const HandleQuestionSubmit = () => {
    const timestamp = new Date()

    let newQuestion = db.collection('questions').doc()
    newQuestion.set({
      id: newQuestion.id,
      postId: id,
      posterId: user.uid,
      question: question,
      createAt: timestamp
    }).then(() => setQuestion('')
    )
  }

  return (
    <>
      <h4>Ask a question:</h4>
      {user ?
        // Question Form
        <div style={{ display: 'flex' }}>
          {/* <div style={{ width: '10%' }}>
            <Image src={user.photoURL} avatar />
          </div> */}
          <div style={{ width: '100%' }}>
            <Form onSubmit={HandleQuestionSubmit}>
              <Form.TextArea required
                onChange={handleQuestionChange}
                value={question}
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button content='Send' labelPosition='left' icon='edit' color="teal" />
              </div>
            </Form>
          </div>
        </div>
        :
        <Segment warning textAlign='center' onClick={() => history.push('/sign-in')}>
          <h5>Please login to leave a message.</h5>
          <Button size="small" color="teal" 
              onClick={() => { history.push('/sign-in') }}>
            Login
          </Button>
        </Segment>
      }
    </>
  )
}

export default QuestionForm