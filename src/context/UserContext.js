import React, { createContext, useState } from 'react'
import firebase from 'firebase'
import db from '../firestore'
import noAvatar from '../assets/images/no-avatar.png'


export const UserContext = createContext()

const UserContextProvider = ({ children }) => {

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [displayName, setDisplayName] = useState('')
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
                let photoURL = noAvatar
                if (userData.photoURL) {
                  setDisplayName(userData.photoURL + "?type=large")
                }
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
          setDisplayName
        }
      }
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider