import React, { createRef } from 'react'
import {
  Container,
  Grid,
  Header,
  Responsive,
  Dimmer,
  Loader,
  Ref,
  Rail,
  Sticky,
  Segment,
  Divider,
  Icon
} from 'semantic-ui-react'
import styles from './styles'
import {
  PriceTimeColumn, Map, PostTitle, PostAboutMeal, PostAboutPoster, QuestionForm, QuestionsContainer
} from '../../components'
// import QuestionForm from '../QuestionForm'
// import { StickyContainer, Sticky } from 'react-sticky';


const Post = ({ post, poster, loading, user }) => {

  let contextRef = createRef()

  return (
    <div>
      {loading ?
        <Dimmer active inverted page>
          <Loader inverted content='Loading' />
        </Dimmer>
        :
        post ?
          <>
            <Container>
              <br></br>
              <Grid column={2} stackable>
                <Grid.Column width={10} >
                  <h1 style={styles.title}>{post.title}</h1>
                  <h5 style={{color:"grey", marginTop: 5, fontSize: 12}}>
                    Post date:{post.createAt.toDate().toLocaleString()}</h5>

                  <Grid column={2}>
                    <Grid.Column width={1}>
                      <div style={{paddingTop: 10, color: "#666abd"}}>
                        <Icon name="point" size="large"/>
                        </div>
                    </Grid.Column>

                    <Grid.Column width={14}>
                        <p><span style={{color: "#666abd"}}>LOCATION</span><br/>
                        {post.pickupAddress.city}</p>

                    </Grid.Column>

                  </Grid>

                  <PostAboutMeal post={post} poster={poster} />

                  {/* ------------------- Price visable on small screen only------------------*/}
                  <Responsive maxWidth={765}>
                    <PriceTimeColumn post={post} poster={poster} />
                  </Responsive>

                  <Divider />
                  <QuestionsContainer post={post} user={user} />

                  <PostAboutPoster post={post} poster={poster} />

                  {/* ------------------- MAP------------------*/}
                  <Header style={{ margin: 0, textAlign: "left" }}>Location</Header>
                  <p style={{ fontSize: 12, marginTop: 0, textAlign: "left" }}>
                    Please contact poster for pickup address privatly.</p>
                  <Map height={300} noSearchBar currentLocation={post.location}
                  // formState={formState} setFormState={setFormState} 
                  />
                </Grid.Column>

                {/* ------------------- Price visable on large screen only------------------*/}
                <Grid.Column width={6}>
                  <Responsive minWidth={766}>

                    <Ref innerRef={contextRef}>
                      <Rail internal close position='left'
                        style={{ width: '100%', margin: 10 }}>
                        <Sticky
                          offset={70}
                          context={contextRef}>
                          <PriceTimeColumn post={post} poster={poster} />
                        </Sticky>
                      </Rail>
                    </Ref>


                  </Responsive>
                </Grid.Column>
              </Grid>
            </Container>
          </>
          :
          <h1>Page not found</h1>
      }
    </div>
  )
}

export default Post