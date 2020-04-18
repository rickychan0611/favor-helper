import React from 'react'
import {
  Container,
  Grid,
  Header,
  Responsive,
  Dimmer,
  Loader,
} from 'semantic-ui-react'
import styles from './styles'
import {
  PriceTimeColumn, Map, PostTitle, PostAboutMeal, PostAboutPoster, QuestionForm, QuestionsContainer
} from '../../components'
// import QuestionForm from '../QuestionForm'


const Post = ({ post, poster, loading, user }) => {
  return (
    <div>
      {loading ?
        <Dimmer active inverted>
          <Loader inverted content='Loading' />
        </Dimmer>
        :
        post ?
          <>
            <Container>
              <br></br>
              <Grid column={2} stackable>
                <Grid.Column width={10} >
                  <PostTitle post={post} poster={poster} />
                  <PostAboutMeal post={post} poster={poster} />

                  {/* ------------------- Price visable on small screen only------------------*/}
                  <Responsive maxWidth={765}>
                    <PriceTimeColumn post={post} poster={poster} />
                  </Responsive>
                  
                  <QuestionsContainer post={post} user={user}/>
                  
                  <PostAboutPoster post={post} poster={poster} />

                  {/* ------------------- MAP------------------*/}
                  <Header style={{ margin: 0, textAlign: "left" }}>Location</Header>
                  <p style={{ fontSize: 12, marginTop: 0, textAlign: "left" }}>
                    Please contact poster for pickup address privatly.</p>
                  <Map height={300} noSearchBar
                  // formState={formState} setFormState={setFormState} 
                  />
                </Grid.Column>

                {/* ------------------- Price visable on large screen only------------------*/}
                <Grid.Column width={6}>
                  <Responsive minWidth={766}>
                    <PriceTimeColumn post={post} poster={poster} />
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