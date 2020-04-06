import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from './routes'
import MapContextProvider from './context/MapContext'
import PostsContextProvider from './context/PostsContext'
import UserContextProvider from './context/UserContext'


//check if user is signed in when page is loaded
// firebase.auth().onAuthStateChanged(function(user) {
//   if (user) {
//     console.log('onAuthStateChanged' + JSON.stringify(user))
//   } else {
//     console.log('onAuthStateChanged not sign in' + JSON.stringify(user))
//   }
// });

// var user = firebase.auth().currentUser;
// if (user) {
//   console.log('currentUser' + JSON.stringify(user))
// } else {
//   // No user is signed in.
// }

const App = () => {
  return (
    <UserContextProvider>
      <PostsContextProvider>
        <MapContextProvider >
          <BrowserRouter>
            <AppRoutes />
          </ BrowserRouter>
        </MapContextProvider>
      </PostsContextProvider>
    </UserContextProvider>
  )
}

export default App;
