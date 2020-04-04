import React, { Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PostList from "../views/PostList"
import Home from "../views/Home"

import {CreatePostForm, TopBar} from "../components"


export default () => (
  <Fragment>
    <TopBar />
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/create-post" exact component={CreatePostForm} />
      <Route path="/posts" component={PostList} />
      <Route path="/register" component={Home} />
      <Route path="/sign-in" component={Home} />
      <Route path="/sign-out" component={Home} />
      <Redirect from="*" to="/" />
    </Switch>
  </Fragment>
)