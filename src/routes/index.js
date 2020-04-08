import React, { Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PostList from "../views/PostList"
import Register from "../views/Register"
import SignIn from "../views/SignIn"
import Home from "../views/Home"
import Profile from "../views/Profile"
import { CreatePostForm, TopBar, Map, Footer } from "../components"
import styles from './styles'
import { Grid, Container } from 'semantic-ui-react';

export default () => (
  <>
    <div style={styles.topBar}>
      <TopBar />
    </div>
    <div style={{
      paddingTop: 55,
    }}>

      <Switch>
        <Route path="/create-post" component={CreatePostForm} />
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto',
          // backgroundColor: 'yellow'
        }}>
          <Route path="/" exact component={Home} />
          {/* <Route path="/*" component={Home} /> */}
          <Route path="/posts" component={PostList} />
          <Route path="/register" component={Register} />
          <Route path="/sign-in" component={SignIn} />
          <Route path="/sign-out" component={Home} />
          <Route path="/profile" component={Profile} />
          <Route path="/map" component={()=><Map height="calc(100vh - 11rem)"/>} />
        </div>
      </Switch>
      {/* <Redirect from="/*" to="/" /> */}
      <br /><br /><br />
      <Footer/>
    </div>
  </>
)