import React, { createContext, useState } from 'react'
import firebase from 'firebase'
import db from '../firestore'
import noAvatar from '../assets/images/no-avatar.png'
import { useHistory } from "react-router-dom";


export const UserContext = createContext()

const UserContextProvider = ({ children }) => {

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [displayName, setDisplayName] = useState('')
  let usersDB = db.collection('users')
  const history = useHistory()

  const updateProfilePic = (downloadURL) => {
    console.log("!!!!updateProfilePic")
    usersDB.doc(user.id).update({ photoURL: downloadURL }).then(() => {
      setUser({ ...user, photoURL: downloadURL })
    });
  }

  const AuthState = () => {
  firebase.auth().onAuthStateChanged(function (userData) {
    let photoURL = noAvatar

    if (userData) {
      // setUser(userData)
      setLoading(false)
      console.log('user signed in')

      // if (userData.providerData[0].providerId == "facebook.com" ) {
      //   setDisplayName(userData.displayName)
      //   photoURL = userData.photoURL + "?type=large"
      // }

      // if (userData.providerData[0].providerId == "google.com" ) {
      //   setDisplayName(userData.displayName)
      //   photoURL = userData.photoURL
      // }
      
      usersDB.where('uid', '==', userData.uid).get()
        .then(snapshot => {
          if (snapshot.empty) {
            let newUserRef = usersDB.doc(userData.uid)
            newUserRef.set(
              {
                id: userData.uid,
                uid: userData.uid,
                displayName: displayName,
                photoURL: photoURL,
                email: userData.email,
                // phoneNumber: userData.photoNumber,
                // provideId: userData.provideId,
                emailVerified: userData.emailVerified
              }
            ).then(function (doc) {
              console.log('callBack@@@@: => ' + JSON.stringify(doc))

              setUser(doc.data())
              setLoading(false)
              history.push('/posts')
              console.log("Document written with ID: ", doc.id);
            })
              .catch(function (error) {
                console.error("Error adding document: ", error);
              })
            // return
          };
          //not empty
          snapshot.forEach(doc => {
            // console.log(doc.id, '=>', JSON.stringify(doc.data()))
            setUser(doc.data())
            setLoading(false)
          });
        })
        .catch(err => {
          console.log('Error getting documents', err);
        });

    } else {
      setUser(null)
      setLoading(false)
      console.log('onAuthStateChanged not sign in')
    }
  });
}

  React.useEffect(
    () => {
      AuthState()
    },[] )

  return (
    <UserContext.Provider
      value={
        {
          user,
          loading,
          updateProfilePic,
          setDisplayName,
          AuthState
        }
      }
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider