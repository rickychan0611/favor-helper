import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import PostList from "../views/PostList"

export default () => (
  <Fragment>
    <Switch>
    <Route path="/" exact component={PostList} />
      {/* <Route path="/profile:userId" component={Profile} /> */}
    </Switch>
  </Fragment>
)