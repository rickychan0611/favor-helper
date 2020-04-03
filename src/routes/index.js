import React, { Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PostList from "../views/PostList"
import {CreatePostForm} from "../components"


export default () => (
  <Fragment>
    <Switch>
      <Redirect exact from="/" to="/posts" />
      <Route path="/create-post" exact component={CreatePostForm} />
      <Route path="/posts" component={PostList} />
    </Switch>
  </Fragment>
)