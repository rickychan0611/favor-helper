import React from 'react'
import { Button, Header, Icon, Segment } from 'semantic-ui-react'
import { useHistory } from "react-router-dom";

import styles from './styles'

const Home = () => {
  const history = useHistory()

  return (
    <div>
      <Segment placeholder basic style={{height: '90vh'}}>
        <Header icon>
          <Icon name='heart outline' color="pink" />
          Welcome to Favor Helper.
          </Header>
        <Button primary
          onClick={() => history.push('./posts')}
        >
          View Posts
          </Button>
      </Segment>
    </div>
  )
}

export default Home