import React from 'react'
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
} from 'semantic-ui-react'
import { Route, Switch, Redirect, useParams } from 'react-router-dom';

import styles from './styles'

const Footer = () => {
  let { id } = useParams();
  return (
    <>
    { id != "register" && id != "sign-in" ?
    <Segment inverted vertical 
    style={{ padding: '5em 0em', backgroundColor: '#929292' }}
      >
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='About' />
              <List link inverted>
                <List.Item as='a'>Sitemap</List.Item>
                <List.Item as='a'>Contact Us</List.Item>
                <List.Item as='a'>Religious Ceremonies</List.Item>
                <List.Item as='a'>Gazebo Plans</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='Services' />
              <List link inverted>
                <List.Item as='a'>Banana Pre-Order</List.Item>
                <List.Item as='a'>DNA FAQ</List.Item>
                <List.Item as='a'>How To Access</List.Item>
                <List.Item as='a'>Favorite X-Men</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header as='h4' inverted>
                Footer Header
        </Header>
              <p>
                Extra space for a call to action inside the footer that could help re-engage users.
        </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container> 
    </Segment>
    : null }
    </>
  )
}

export default Footer
