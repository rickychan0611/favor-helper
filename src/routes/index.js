import React, { Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PostList from "../views/PostList"
import Home from "../views/Home"
import {CreatePostForm, TopBar, Map} from "../components"

import styles from './styles'
import { Container } from 'semantic-ui-react';

export default () => (
  <Fragment>
    <div style={styles.topBar}>
    <TopBar />
    </div>
    <div style={styles.topSpace}></div>
    <Container>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/create-post" exact component={CreatePostForm} />
      <Route path="/posts" component={PostList} />
      <Route path="/register" component={Home} />
      <Route path="/sign-in" component={Home} />
      <Route path="/sign-out" component={Home} />
      <Route path="/map" component={Map} />
      <Redirect from="*" to="/" />
    </Switch>
    </Container>
  </Fragment>
)