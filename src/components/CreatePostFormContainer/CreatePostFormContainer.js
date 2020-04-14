import React, {useState} from 'react'
import { CreatePostForm, PostControlBottomBar } from '../../components'
import {
  Container,
  Grid,
  Button,
  Form,
  Header,
  Segment,
  Input,
  Rating,
  Image,
  Divider,
  Icon,
  Checkbox,
  Responsive
} from 'semantic-ui-react'
import styles from './styles'

const CreatePostFormContainer = () => {
  const [openBottomBar, setOpenBottomBar] = useState(false)

  return (
    <>
    
      <div style={{paddingBottom: 80}}>
        <CreatePostForm/>
      </div>
      <PostControlBottomBar />
    </>
  )
}

export default CreatePostFormContainer