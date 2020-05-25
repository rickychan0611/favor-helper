import React, { useState, useContext } from 'react';
import { Route, Switch, useLocation, useParams, Redirect } from 'react-router-dom';
import PostList from "../views/PostList"
import Register from "../views/Register"
import SignIn from "../views/SignIn"
import Home from "../views/Home"
import Profile from "../views/Profile"
import PostDetail from "../views/PostDetail"
import MyOrders from "../views/MyOrders"
import MyPosts from "../views/MyPosts"
import MySales from "../views/MySales"
import CreatePostStepsContainer from "../views/CreatePostSteps/CreatePostStepsContainer"

import { CreatePostForm, TopBar, Map, SideNavBar, Footer, CreatePostFormContainer } from "../components"
import styles from './styles'
import { Grid, Dimmer } from 'semantic-ui-react';

export default (props) => {
  const [navDim, setNavDim] = useState(false)
  let { id } = useParams();
  let location = useLocation();

  return (
    <>
      <div style={styles.topBar}>
        <TopBar />
      </div>

      <SideNavBar setNavDim={setNavDim} />
      <Dimmer.Dimmable dimmed={navDim} blurring>
        <Dimmer active={navDim} inverted />
        <div style={{
          paddingTop: 72,
          postion: "relative",
          height: '100%',
          // backgroundColor: 'yellow'
        }}>
          <Switch>
            {/* <Route path="/create-post" component={CreatePostFormContainer} /> */}
            <Route path="/create-post" component={CreatePostStepsContainer} />
            <Route path="/edit/:id" component={CreatePostFormContainer} />
            <Route path="/details/:id" component={PostDetail} />
            <Route path="/" exact component={CreatePostStepsContainer} />
            {/* <Route path="*" component={Home} /> */}

            <div style={{
              maxWidth: '1000px',
              margin: '0 auto',
              paddingTop: 10,
              posotion: 'relative',
              // backgroundColor: 'yellow'
            }}>
              {/* <Route path="/*" component={Home} /> */}
              {/* <Route path="/" exact component={Home} /> */}

              <Route path="/posts" component={PostList} />
              <Route path="/register" component={Register} />
              <Route path="/sign-in" component={SignIn} />
              <Route path="/sign-out" component={Home} />
              <Route path="/profile" component={Profile} />
              <Route path="/my-orders" component={MyOrders} />
              <Route path="/my-posts" component={MyPosts} />
              <Route path="/my-sales" component={MySales} />
              <Route path="/user/:id" component={Profile} />
              <Route path="/map" component={() => <Map height="80vh" />} />
            </div>
          </Switch>

          <Redirect from="/*" to="/" />
          <div style={{ postion: 'absolute', bottom: 0, marginTop: 20 }}>
            {/* <Route path="/:id" children={<Footer />} /> */}
          </div>

        </div>
      </Dimmer.Dimmable>

    </>
  )
}