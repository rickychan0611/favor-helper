import React, { useEffect, useState } from 'react'
import { Header, Segment, Comment, Form, Button, TextArea } from 'semantic-ui-react'
import db from '../../firestore'
import { QuestionRepliesContainer } from '../../components/';
import { UserContext } from '../../context/UserContext'

import styles from './styles'

const Question = ({ item }) => {
  const { user } = React.useContext(UserContext)

  const [poster, setPoster] = useState({})
  const [onReply, setOnReply] = useState(false)
  const [replyContent, setReplyContent] = useState('')
  const [allReplies, setAllReplies] = useState([])
  const [newReply, setNewReply] = useState(null)

  useEffect(() => {
    db.collection('users').where('uid', '==', item.posterId).get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          setPoster(doc.data())
        })
      })
  }, [])

  const onReplyChange = (e, { value }) => {
    setReplyContent(value)
  }

  const onReplySubmit = () => {
    setOnReply(false)
    const timestamp = Date.now().toLocaleString()
    let newReply = db.collection('questionReplies').doc()
    const data = {
      id: newReply.id,
      questionId: item.id,
      posterId: user.id,
      replyContent: replyContent,
      createAt: timestamp
    }
    newReply.set(data).then((doc) => {
      // setNewReply(data)
      setReplyContent('')
    })
  }

  return (
    <div>
      <Comment>
        <Comment.Avatar src={poster.photoURL} />
        <Comment.Content>
          <Comment.Author as='a' style={{ fontSize: 12, color: "teal" }}>{poster.displayName}</Comment.Author>
          <Comment.Metadata>
            <div>{item.createAt.toDate().toLocaleString()}</div>
          </Comment.Metadata>
          <Comment.Text><h4>{item.question}</h4></Comment.Text>

          <QuestionRepliesContainer questionId={item.id} newReply={newReply} />

          {!onReply ?
            <Comment.Actions>
              <Comment.Action onClick={() => { setOnReply(true) }}>
                Reply
                </Comment.Action>
            </Comment.Actions>
            :
            // <QuestionForm user={user}  replyQuestion={true}/>
            <Form onSubmit={onReplySubmit}>
              <Form.TextArea required
                placeholder='Reply...'
                rows={2}
                value={replyContent}
                onChange={onReplyChange}
              />
              <Button
                type='submit'
                content='Add Reply'
                labelPosition='left'
                icon='edit'
                primary
                size="tiny"
              // onClick={() => { onReplySubmit(false) }}
              />
              <Button size="tiny" onClick={() => { setOnReply(false) }}>Cancel</Button>
            </Form>
          }
        </Comment.Content>
      </Comment>
      <br />
    </div>
  )
}

export default Question