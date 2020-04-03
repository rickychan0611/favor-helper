import React, { useState } from 'react'
import db from '../../firestore'
import posts from '../../data/posts.json'
import { useHistory } from "react-router-dom";
import { firebase } from '@firebase/app';

import {
  Container,
  Button,
  Form,
  Header,
  Segment,
  Input
} from 'semantic-ui-react'

import styles from './styles'

const CreatePostForm = () => {
  const history = useHistory()
  const [state, setState] = useState({
    title: '',
    location: '',
    jobDate: '',
    budget: 0,
    desc: '',
    authorPic : ''
  })

  let randomPic = () => {
    return 'https://avatars.dicebear.com/v2/human/' + Math.floor(Math.random() * 100) + '.svg'
  }

  const handleChange = (e, { name, value }) => setState({ ...state, [name]: value })

  const handleSubmit = () => {
    setState({ ...state, submitted: true })

   const timestamp = new Date()

    let newPost = db.collection("posts").doc()
    newPost.set(
      { ...state, 
        id: newPost.id, 
        authorPic: randomPic(),
        createAt: timestamp}
      )
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      })
    
      // add initial posts to db
      // posts.map(item => {
      //   const newPost = db.collection("posts").doc()
      //   newPost.set(
      //     { ...item, id: newPost.id }
      //     )
      //    })

    history.push('/posts')

  }

  

  return (
    <Container>
      <br></br>
      <Segment>
        <Form onSubmit={handleSubmit}>
          <Form.Group widths='equal'>
            <Form.Input fluid label='Title' placeholder='Title'
              name="title" value={state.title} onChange={handleChange} />
            <Form.Input fluid label='Location' placeholder='City'
              name="location" value={state.location} onChange={handleChange} />
            <Form.Input fluid label='Job Date' placeholder='Job Date'
              name="jobDate" value={state.jobDate} onChange={handleChange} />
            <Form.Input fluid label='Budget' placeholder='Budget'
              name="budget" value={state.budget} onChange={handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.TextArea label='Job Details' placeholder='Tell us more about your job...'
              name="desc" value={state.desc} onChange={handleChange} width={16} />
          </Form.Group>
          <Form.Button content='Submit' />
        </Form>
        <br></br>
        {JSON.stringify(state)}
      </Segment>
    </Container>
  )
}

export default CreatePostForm