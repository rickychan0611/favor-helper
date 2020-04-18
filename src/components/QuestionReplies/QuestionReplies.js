import React, { useState, useEffect } from 'react'
import { Header, Segment, Comment, Form, Button, TextArea } from 'semantic-ui-react'
import db from '../../firestore'

import styles from './styles'

const QuestionReplies = ({ item }) => {
  const [poster, setPoster] = useState([])

  useEffect(() => {
    //get poster from server
    db.collection('users').where('uid', '==', item.posterId).get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          console.log(JSON.stringify(doc.data()))
          setPoster(doc.data())
        })
      }
    )
  }, [])

  return (
    <>
      {item ?
        <Comment.Group>
          <Comment>
            <Comment.Avatar src={poster.photoURL} />
            <Comment.Content>
              <Comment.Author as='a'>{poster.displayName}</Comment.Author>
              <Comment.Metadata>
                <div>{item.createAt}</div>
              </Comment.Metadata>
              <Comment.Text>{item.replyContent}</Comment.Text>
            </Comment.Content>
          </Comment>
        </Comment.Group>
        : null
      }
    </>
  )
}

export default QuestionReplies