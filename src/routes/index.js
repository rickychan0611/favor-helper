import React, { Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PostList from "../views/PostList"
import Register from "../views/Register"
import SignIn from "../views/SignIn"
import Home from "../views/Home"
import Profile from "../views/Profile"
import { CreatePostForm, TopBar, Map } from "../components"

import styles from './styles'
import { Grid, Container } from 'semantic-ui-react';

export default () => (
  <div style={{
    maxWidth: 1200,
    margin: '0 auto',
    paddingTop: 60,
  }}>
    <div style={styles.topBar}>
      <TopBar />
    </div>
    <div style={{}}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/create-post" exact component={CreatePostForm} />
        <Route path="/posts" component={PostList} />
        <Route path="/register" component={Register} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/sign-out" component={Home} />
        <Route path="/profile" component={Profile} />
        <Route path="/map" component={Map} />
        <Redirect from="*" to="/" />
      </Switch>
    </div>
  </div>
)