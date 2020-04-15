import React, { createContext, useState } from 'react'
import firebase from 'firebase'
import db from '../firestore'

export const UserContext = createContext()

const UserContextProvider = ({ children }) => {

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  let usersDB = db.collection('users')

  const updateProfilePic = (downloadURL) => {
    console.log("!!!!updateProfilePic")
    usersDB.doc(user.id).update({ photoURL: downloadURL }).then(() => {
      setUser({ ...user, photoURL: downloadURL })
    });
  }

  React.useEffect(
    () => {
      firebase.auth().onAuthStateChanged(function (userData) {
        if (userData) {
          // setUser(userData)
          setLoading(false)
          console.log('user signed in')
          // console.log(JSON.stringify(userData))

          usersDB.where('uid', '==', userData.uid).get()
            .then(snapshot => {
              if (snapshot.empty) {

                let newUserRef = usersDB.doc(userData.uid)
                let largPic = newUserRef.photoURL + "?type=large"
                newUserRef.set(
                  {
                    id: userData.uid,
                    uid: userData.uid,
                    displayName: userData.displayName,
                    photoURL: userData.photoURL + "?type=large",
                    email: userData.email,
                    // phoneNumber: userData.photoNumber,
                    // provideId: userData.provideId,
                    emailVerified: userData.emailVerified
                  }
                ).then(function (doc) {
                  setUser(doc.data())
                  setLoading(false)
                  console.log("Document written with ID: ", doc.id);
                })
                  .catch(function (error) {
                    console.error("Error adding document: ", error);
                  })
                return
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
    },
    []
  )

  return (
    <UserContext.Provider
      value={
        {
          user,
          loading,
          updateProfilePic,
        }
      }
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider