import React, { useState, useEffect } from 'react'
import db from '../../firestore'
import { UserContext } from '../../context/UserContext'

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
} from 'semantic-ui-react'
import { QuestionsContainer } from '../../components/';

const timestamp = new Date()

const PostDetail = (props) => {
  let { id } = useParams();
  let history = useHistory()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const { user } = React.useContext(UserContext)


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

  const Post = ({ post }) => {
    return (
      <div>
        {loading ?
          <Dimmer active inverted>
            <Loader inverted content='Loading' />
          </Dimmer>
          :
          post ?
            <div>
              <h2>{post.title}</h2>
              description: {post.desc}<br />
              location: {post.location}<br />
              postDate: {post.postDate}<br />
              jobDate: {post.jobDate}<br />
              budget: {post.budget}<br />
              author id: {post.author}<br />
            </div>
            :
            <h1>Page not found</h1>
        }
      </div>
    )
  }

  useEffect(() => {
    if (!props.post) {
      postQuery(id)
    }
    if (props.post) {
      setLoading(false)
    }
  }, [id])

  const [question, SetQueston] = useState('')
  const handleQuestionChange = (e, { value }) => {
    SetQueston(value)
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
    })
  }

  return (
    <Container style={styles.container}>
      <Divider horizontal>Post details</Divider>
      {props.post ?
        <div>
          {/* fetch from local, preload from context via props */}
          <Post post={props.post} />
          <QuestionsContainer post={props.post} />
        </div>
        :
        <div>
          {/* fetch from server, data load here when refresh */}
          <Post post={post} />
          <QuestionsContainer post={post} />
        </div>
      }
      <h4>Ask poster a question</h4>
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
              <Button type='submit'>Send</Button>
            </div>
          </Form>
        </div>
      </div>
      <br></br>
      <Divider />
      <Button onClick={() => history.push('/posts')}>Go back</Button>
    </Container>
  )
}

export default PostDetail