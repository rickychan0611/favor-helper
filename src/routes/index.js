import React, { Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PostList from "../views/PostList"
import PostDetail from "../views/PostDetail"


export default () => (
  <Fragment>
    <Switch>
      <Redirect exact from="/" to="/posts" />
      {/* <Route path="/" exact component={PostList} /> */}
      <Route path="/posts" component={PostList} />
    </Switch>
  </Fragment>
)