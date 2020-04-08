import React, { Fragment } from 'react';
import { Route, Switch, Redirect, useParams } from 'react-router-dom';
import PostList from "../views/PostList"
import Register from "../views/Register"
import SignIn from "../views/SignIn"
import Home from "../views/Home"
import Profile from "../views/Profile"
import { CreatePostForm, TopBar, Map, Footer } from "../components"

import styles from './styles'
import { Grid, Container } from 'semantic-ui-react';

export default (props) => {
  let { id } = useParams();
  return (
    <>
      <div style={styles.topBar}>
        <TopBar />
      </div>
      <div style={{
        paddingTop: 55,
        postion: "relative",
        height: '100vh',
        // backgroundColor: '#fafafa'
        // backgroundColor: 'yellow'

      }}>
        <Switch>
          <Route path="/create-post" component={CreatePostForm} />
          <div style={{
            maxWidth: '1000px',
            margin: '0 auto',
            paddingTop: 10,
            posotion: 'relative',
            // backgroundColor: 'yellow'
          }}>
            <Route path="/" exact component={Home} />
            {/* <Route path="/*" component={Home} /> */}
            <Route path="/posts" component={PostList} />
            <Route path="/register" component={Register} />
            <Route path="/sign-in" component={SignIn} />
            <Route path="/sign-out" component={Home} />
            <Route path="/profile" component={Profile} />
            <Route path="/map" component={() => <Map height="80vh" />} />
          </div>
        </Switch>
        {/* <Redirect from="/*" to="/" /> */}
        <div style={{ postion: 'absolute', bottom: 0, marginTop: 20 }}>
            <Route path="/:id" children={<Footer />} />
        </div>
      </div>
    </>
  )
}