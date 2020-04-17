import React, { useState, useEffect } from 'react'
import db from '../../firestore'
import { UserContext } from '../../context/UserContext'
import { PostsContext } from '../../context/PostsContext'
import { PhotoSlideInDetail, Map, PreviewIcon, PickFile, Post } from '../../components'

import styles from './styles'
import {
  useParams, useRouteMatch, useHistory
} from "react-router-dom";

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

const timestamp = new Date()

const PostDetail = (props) => {
  let { id } = useParams();
  let history = useHistory()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const { user } = React.useContext(UserContext)
  const { posts } = React.useContext(PostsContext)

  useEffect(() => {
    setPost(() => posts.filter(item => item.id == id))
  }, [])

  const postQuery = (id) => {
    return (
      db.collection('posts').where('id', '==', id)
        .get()
        .then(snapshot => {
          if (snapshot.empty) {
            console.log('No matching documents.');
            setLoading(false)
          }
          snapshot.forEach(doc => {
            setPost(doc.data())
            setLoading(false)
          });
        })
        .catch(err => {
          console.log('Error getting documents', err);
          setLoading(false)
        })
    )
  }

 

  useEffect(() => {
    if (!post) {
      postQuery(id)
    }
    if (post) {
      setLoading(false)
    }
  }, [id])

  const [question, setQuestion] = useState('')
  const handleQuestionChange = (e, { value }) => {
    setQuestion(value)
    console.log('value' + question)
  }
  const HandleQuestionSubmit = () => {
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
      {post ? <PhotoSlideInDetail images={post.images} /> : null}

      <Container style={styles.container}>
        {post ?
          <>
            <div>
          {/* {JSON.stringify(post)} */}
              <Post post={post} loading={loading} />
              <QuestionsContainer post={post} />
            </div>
          </>
          :
          <h3>loading</h3>
        }
        <h4>Ask poster a question</h4>
        {user ?
          <div style={{ display: 'flex' }}>
            <div style={{ width: '10%' }}>
              <Image src={user.photoURL} avatar />
            </div>
            <div style={{ width: '90%' }}>
              <Form onSubmit={HandleQuestionSubmit}>
                <Form.TextArea
                  placeholder='Ask a question...'
                  onChange={handleQuestionChange}
                  value={question}
                />

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button content='Submit'>Send</Button>
                </div>
              </Form>
            </div>
          </div> :

          <Segment warning textAlign='center' onClick={() => history.push('/sign-in')}>
            Please login to leave a message</Segment>
        }
        <br></br>
        <Divider />
        <Button onClick={() => history.push('/posts')}>Go back</Button>
      </Container>
    </>
  )
}

export default PostDetail