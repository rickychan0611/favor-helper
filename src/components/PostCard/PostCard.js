import React, { Fragment } from 'react'
// import {
//   Card,
//   CardBody,
//   CardText,
//   Row,
//   Col
// } from "reactstrap";

import { Card, Icon, Image, Grid, Segment, Header } from 'semantic-ui-react'
import "./styles.css";


const PostCard = ({ item, click }) => {
  return (
    <Fragment>
      <Segment fluid="true" >
        <Grid column={2} >
          <Grid.Column width={11}>
            <Header as='h3'>{item.title}</Header>
            <Card.Meta>
              <Icon name='calendar alternate outline' /><span className='date'>Date: {item.jobDate}</span>
            </Card.Meta>
            <Card.Description>
              <Icon name='point' />
            Location: {item.location}
            </Card.Description>
          </Grid.Column>

          <Grid.Column floated="right" width={5} textAlign='right'>
            <div style={{marginBottom: '.5vh', fontSize: 'calc(100% + .8vw)'}}>${item.budget}</div>
              <Image src={item.authorPic} avatar style={{fontSize: 28, objectFit: 'cover'}} />
          </Grid.Column>
        </Grid>
      </Segment>
    </Fragment>
  )
}

export default PostCard