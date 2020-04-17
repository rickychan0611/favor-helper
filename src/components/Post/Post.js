import React from 'react'
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
  Modal,
  Responsive,
  Dimmer,
  Loader,
  Divider
} from 'semantic-ui-react'
import styles from './styles'
import { PriceTimeColumn, Map, PreviewIcon, PickFile } from '../../components'


const Post = ({ post, poster, loading }) => {
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

                  {/* ------------------- Title ------------------*/}
                  <Segment placeholder basic textAlign="center">
                    <h1 styles={styles.title}>{post.title}</h1>
                    <p style={{ fontSize: 20 }}>
                      {post.address ? post.address[2].long_name : null}</p>
                    <Segment basic><Rating defaultRating={4} maxRating={5} icon='star' disabled /> ({4})
                    <br /><br />
                      <img src={poster.photoURL}
                        style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: '50%' }} />
                      <br />
                      {poster.displayName}
                    </Segment>
                  </Segment>

                  {/* ------------------- Details ------------------*/}
                  <div style={{ textAlign: "left" }}>

                    <Header>About this meal</Header></div>

                  <Segment textAlign="left">
                    <Header style={{marginBottom: 0}}>Style</Header>
                    {post.dishStyle}
                    <Divider fluid />
                    <Header>Summary</Header>
                    {post.summary}
                  </Segment>


                  {/* ------------------- Price visable on small screen only------------------*/}
                  <Responsive maxWidth={765}>
                    <PriceTimeColumn
                    post={post}
                    poster={poster}
                    // preview={preview}
                    // formState={formState}
                    // setFormState={setFormState}
                    // handleChange={handleChange}
                    // pickUpToggle={pickUpToggle}
                    // deliveryToggle={deliveryToggle}
                    />
                  </Responsive>


                  {/* ------------------- About Me------------------*/}
                  <br />
                  <Header style={{ margin: 0, textAlign: "left" }}>About {poster.DisplayName}</Header>
                  {/* <p style={{ fontSize: 12, marginTop: 0, textAlign: "left" }}> */}
                    <Segment>
                      <Grid column={2} stackable>
                        <Grid.Column width={4}>
                          <div style={{ textAlign: 'center', margin: "0 auto" }}>

                            <>
                              <img src={poster.photoURL}
                                style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: '50%' }} />
                            </>

                          </div>
                        </Grid.Column>
                        <Grid.Column width={12}>
                          {post.aboutMe}
                        </Grid.Column>
                      </Grid>
                    </Segment>
                    {/* ------------------- Loaction map------------------*/}

                    <Header style={{ margin: 0, textAlign: "left" }}>Location</Header>
                    <p style={{ fontSize: 12, marginTop: 0, textAlign: "left" }}>
                      Please contact poster for pickup address privatly.</p>
                    <Map height={300} noSearchBar={true}
                    // formState={formState} setFormState={setFormState} 
                    />
                </Grid.Column>


                  {/* ------------------- Price visable on large screen only------------------*/}
                  <Grid.Column width={6}>
                    <Responsive minWidth={766}>
                      <PriceTimeColumn
                       post={post}
                       poster={poster}
                      // preview={preview}
                      // formState={formState}
                      // setFormState={setFormState}
                      // handleChange={handleChange}
                      // pickUpToggle={pickUpToggle}
                      // deliveryToggle={deliveryToggle}
                      />
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